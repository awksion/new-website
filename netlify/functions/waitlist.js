/**
 * Netlify Serverless Function: waitlist
 * Handles email collection and saves submissions to Airtable.
 *
 * Required environment variables (set in Netlify Dashboard):
 *   AIRTABLE_API_KEY  — Personal Access Token from airtable.com/create/tokens
 *   AIRTABLE_BASE_ID  — Base ID from airtable.com/api (starts with "app")
 */

// Simple email format validator — no external packages needed
const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  // Must have exactly one @, a domain part, and a TLD
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) && trimmed.length <= 254;
};

// Sanitize a string: trim whitespace and strip any HTML/script tags
const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/<[^>]*>/g, '').slice(0, 500);
};

exports.handler = async (event) => {
  // ── 1. Only accept POST requests ──────────────────────────────────────────
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method not allowed. Use POST.' }),
    };
  }

  // ── 2. Parse and validate the request body ────────────────────────────────
  let email, name;
  try {
    const body = JSON.parse(event.body || '{}');
    email = sanitize(body.email || '');
    name  = sanitize(body.name  || '');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Invalid JSON body.' }),
    };
  }

  if (!email || !isValidEmail(email)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'A valid email address is required.' }),
    };
  }

  // ── 3. Check that Airtable credentials are present ────────────────────────
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID environment variables.');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Server configuration error. Please contact support.' }),
    };
  }

  // ── 4. Check for duplicate email in Airtable ──────────────────────────────
  try {
    // Airtable formula to find an exact email match (case-insensitive)
    const formula = encodeURIComponent(`LOWER({Email}) = "${email.toLowerCase()}"`);
    const checkUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Waitlist?filterByFormula=${formula}&maxRecords=1`;

    const checkRes = await fetch(checkUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (checkRes.ok) {
      const checkData = await checkRes.json();
      if (checkData.records && checkData.records.length > 0) {
        // Email already exists — return a friendly message instead of an error
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: "You're already on the waitlist! We'll be in touch.",
            alreadyRegistered: true,
          }),
        };
      }
    }
  } catch (err) {
    // Duplicate check failed — log but continue to attempt the insert
    console.warn('Duplicate check failed, continuing:', err.message);
  }

  // ── 5. Save the new record to Airtable ────────────────────────────────────
  try {
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Waitlist`;

    // Build fields — only include Name if it was provided
    const fields = { Email: email.toLowerCase() };
    if (name) fields['Name'] = name;

    const airtableRes = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    const airtableData = await airtableRes.json();

    // Airtable returns 422 for validation errors (e.g. invalid field type)
    if (!airtableRes.ok) {
      console.error('Airtable error:', JSON.stringify(airtableData));
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Could not save your email. Please try again later.' }),
      };
    }

    // ── 6. Success ─────────────────────────────────────────────────────────
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "You're on the waitlist! We'll be in touch soon.",
        id: airtableData.id,
      }),
    };
  } catch (err) {
    console.error('Unexpected error saving to Airtable:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'An unexpected error occurred. Please try again later.' }),
    };
  }
};
