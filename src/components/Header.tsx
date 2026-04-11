'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/utils';

const BASE = 'https://flughafen-muenchen-taxi.de';

const navLinks = [
  { href: `${BASE}/index.html`, label: 'Home' },
  { href: `${BASE}/preise.html`, label: 'Preise' },
  { href: `${BASE}/business.html`, label: 'Business' },
  { href: `${BASE}/fuhrpark.html`, label: 'Fuhrpark' },
  { href: `${BASE}/kontakt.html`, label: 'Kontakt' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ background: '#111111' }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={BASE} className="flex items-center space-x-2">
            <div className="text-white font-bold text-lg leading-tight">
              Flughafen München Taxi
              <small className="block text-xs text-gray-400 font-normal">Flughafentransfer 24/7</small>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center space-x-3">
            <a
              href={CONTACT_INFO.phoneHref}
              className="hidden lg:flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-bold transition-colors"
            >
              <Phone size={14} />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a
              href={`${BASE}/anfrage.html`}
              className="hidden md:flex bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-bold transition-colors"
            >
              🚖 Jetzt Buchen
            </a>
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`${BASE}/anfrage.html`}
                className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-3 rounded-md font-bold mt-2 text-sm"
              >
                🚖 Jetzt Buchen
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
