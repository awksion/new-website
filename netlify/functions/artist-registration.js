/**
 * Netlify Serverless Function: artist-registration
 * Handles artist registration form submissions and saves to Airtable.
 *
 * Required environment variables (set in Netlify Dashboard):
 *   AIRTABLE_API_KEY      — Personal Access Token from airtable.com/create/tokens
 *   AIRTABLE_BASE_ID      — Base ID from airtable.com/api (starts with "app")
 *
 * Expects the Airtable base to have a table named "Artists" with fields:
 *   Email, ArtistName, ContentType, Website, SocialMedia, Bio
 */

const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) && trimmed.length <= 254;
};

const sanitize = (str, maxLen = 500) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/<[^>]*>/g, '').slice(0, maxLen);
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method not allowed. Use POST.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Invalid JSON body.' }),
    };
  }

  const email       = sanitize(body.email       || '');
  const artist_name = sanitize(body.artist_name || '');
  const content_type = sanitize(body.content_type || '');
  const website     = sanitize(body.website     || '', 2048);
  const social_media = sanitize(body.social_media || '');
  const bio         = sanitize(body.bio         || '', 2000);

  if (!email || !isValidEmail(email)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'A valid email address is required.' }),
    };
  }

  if (!artist_name) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Artist name is required.' }),
    };
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable environment variables.');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Server configuration error. Please contact support.' }),
    };
  }

  // Duplicate check
  try {
    const formula = encodeURIComponent(`LOWER({Email}) = "${email.toLowerCase()}"`);
    const checkRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Artists?filterByFormula=${formula}&maxRecords=1`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
    );
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      if (checkData.records && checkData.records.length > 0) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: 'This email is already registered. We will be in touch!',
            alreadyRegistered: true,
          }),
        };
      }
    }
  } catch (err) {
    console.warn('Duplicate check failed, continuing:', err.message);
  }

  try {
    const fields = {
      Email: email.toLowerCase(),
      ArtistName: artist_name,
    };
    if (content_type) fields['ContentType'] = content_type;
    if (website)      fields['Website']     = website;
    if (social_media) fields['SocialMedia'] = social_media;
    if (bio)          fields['Bio']         = bio;

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Artists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    const airtableData = await airtableRes.json();

    if (!airtableRes.ok) {
      console.error('Airtable error:', JSON.stringify(airtableData));
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Could not save your registration. Please try again later.' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Registration submitted successfully! We will be in touch.',
        id: airtableData.id,
      }),
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'An unexpected error occurred. Please try again later.' }),
    };
  }
};
