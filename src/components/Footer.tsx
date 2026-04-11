import { CONTACT_INFO } from '@/lib/utils';

const BASE = 'https://flughafen-muenchen-taxi.de';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#111111', borderTop: '1px solid #222' }} className="text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-white font-bold text-lg mb-2">Flughafen München Taxi</div>
            <p className="text-sm text-gray-500">Ihr zuverlässiger Flughafentransfer – pünktlich, komfortabel, zum Festpreis.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Links</div>
            <ul className="space-y-2 text-sm">
              <li><a href={`${BASE}/index.html`} className="hover:text-white transition-colors">Home</a></li>
              <li><a href={`${BASE}/preise.html`} className="hover:text-white transition-colors">Preise</a></li>
              <li><a href={`${BASE}/fuhrpark.html`} className="hover:text-white transition-colors">Fuhrpark</a></li>
              <li><a href={`${BASE}/business.html`} className="hover:text-white transition-colors">Business</a></li>
              <li><a href={`${BASE}/kontakt.html`} className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Kontakt</div>
            <ul className="space-y-2 text-sm">
              <li><a href={CONTACT_INFO.phoneHref} className="hover:text-white transition-colors">{CONTACT_INFO.phone}</a></li>
              <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a></li>
              <li className="text-gray-500">24/7 erreichbar</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #222' }} className="pt-6 flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <span>© {year} Flughafen München Taxi. Alle Rechte vorbehalten.</span>
          <span className="flex gap-4">
            <a href={`${BASE}/impressum.html`} className="hover:text-white transition-colors">Impressum</a>
            <a href={`${BASE}/kontakt.html`} className="hover:text-white transition-colors">Kontakt</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
