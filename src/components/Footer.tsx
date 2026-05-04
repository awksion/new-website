import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-background border-t border-cyan-500/50">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src="/images/logo.png" alt="Awksion" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              A revolutionary AI-driven live music platform that flips the traditional touring model, empowering fans to fund the shows they want to see in their hometowns.
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Toronto, ON M5V 2T6</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>hello@awksion.com</span>
            </div>
          </div>

          {/* Fans */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Fans</h4>
            <ul className="space-y-3">
              {[
                { label: 'Artist Playbook', to: '/artist-playbook' },
                { label: 'Venue Intelligence', to: '/venue-intelligence' },
                { label: 'Waitlist', to: '/waitlist' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artists & Venues */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Artists & Venues</h4>
            <ul className="space-y-3">
              {['Launch Campaign', 'AI Data Intelligence', 'Platform Pricing', 'Artist Playbook', 'Venue Intelligence'].map((label) => (
                <li key={label}>
                  <Link to="/waitlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Awksion is a fan-funding platform and is not a talent agency. Placing a bid does not create a contract until the campaign is successfully funded and capacity allows.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-driven data provided to venues is intended for market analysis and booking optimization. All ticket allocations are subject to venue capacity and final bid rankings.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><FacebookIcon /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><TwitterIcon /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><LinkedInIcon /></a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Awksion</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Bidding</a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
            Made for the Crowd
          </p>
        </div>
      </div>
    </footer>
  );
}
