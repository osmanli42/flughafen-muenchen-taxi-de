import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { CONTACT_INFO, formatPrice } from '@/lib/utils';
import { allCitySlugs, citiesBySlug } from '@/lib/citiesData';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('home_title'),
    description: t('home_description'),
    alternates: {
      canonical: `https://flughafen-muenchen-taxi.de/${locale}`,
      languages: {
        de: 'https://flughafen-muenchen-taxi.de/de',
        en: 'https://flughafen-muenchen-taxi.de/en',
        tr: 'https://flughafen-muenchen-taxi.de/tr',
      },
    },
    openGraph: {
      title: t('home_title'),
      description: t('home_description'),
      url: `https://flughafen-muenchen-taxi.de/${locale}`,
      siteName: 'flughafen-muenchen-taxi.de',
      locale: locale === 'de' ? 'de_DE' : locale === 'en' ? 'en_GB' : 'tr_TR',
      type: 'website',
    },
  };
}

const fleetData = [
  {
    type: 'Kombi Taxi',
    icon: '🚕',
    persons: '1–4',
    basePrice: 36,
    luggage: '4 Koffer',
    features: ['Klimaanlage', 'Festpreis', 'Pünktlicher Service', 'Baby-Sitz auf Anfrage'],
  },
  {
    type: 'Van Taxi',
    icon: '🚐',
    persons: '1–7',
    basePrice: 48,
    luggage: '7 Koffer',
    features: ['Kombi-Innenraum', 'Extra Laderaum', 'Familien-ideal', 'Festpreis'],
    popular: true,
  },
  {
    type: 'Grossraumtaxi',
    icon: '🚌',
    persons: '1–8',
    basePrice: 59,
    luggage: '8+ Koffer',
    features: ['Maximaler Platz', 'Gruppenreisen', 'Firmentransfer', 'Festpreis'],
  },
];

const testimonials = [
  {
    stars: 5,
    text: 'Absolut zuverlässig! Der Fahrer war pünktlich, das Auto sauber und der Preis exakt wie vereinbart. Bin schon mehrmals zum Flughafen München gefahren worden – immer top!',
    author: 'Michael S.',
    city: 'Augsburg',
  },
  {
    stars: 5,
    text: 'Bestellt, bestätigt, fertig. Keine Überraschungen beim Preis, kein Stress. Perfekter Transfer für den frühen Morgenflug. Sehr empfehlenswert!',
    author: 'Lena K.',
    city: 'Ingolstadt',
  },
  {
    stars: 5,
    text: 'Haben den Van für 6 Personen gebucht – alles hat perfekt geklappt. Fahrer war sehr freundlich und hilfsbereit mit dem Gepäck. Gerne wieder!',
    author: 'Thomas & Familie R.',
    city: 'Rosenheim',
  },
];

const popularCitySlugs = allCitySlugs.slice(0, 12);

export default function HomePage() {
  const locale = useLocale();

  const popularCities = popularCitySlugs
    .map((slug) => citiesBySlug[slug])
    .filter(Boolean);

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen bg-dark-900 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,106,0.08) 0%, transparent 70%),
            linear-gradient(to bottom, #0a0a0a 0%, #111111 100%)
          `,
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#d4af6a 1px, transparent 1px), linear-gradient(90deg, #d4af6a 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 bg-dark-700 border border-dark-600 text-light-secondary text-sm px-4 py-2 rounded-full mb-8">
            <Star className="w-4 h-4 text-gold-400 fill-current" />
            Über 10.000 zufriedene Kunden
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            Ihr Premium-Taxi zum{' '}
            <span className="text-gold-400">Flughafen München</span>
          </h1>

          {/* Gold subtitle */}
          <p className="text-gold-400 text-xl md:text-2xl font-semibold tracking-widest uppercase mb-8">
            Festpreis &middot; Pünktlich &middot; 24/7
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              'Festpreisgarantie',
              'Kostenlose Stornierung',
              'Professionelle Fahrer',
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 text-light-secondary text-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
                {badge}
              </div>
            ))}
          </div>

          {/* SearchBar card */}
          <div className="bg-dark-700 border border-dark-600 rounded-2xl shadow-2xl p-4 sm:p-6 text-left">
            <SearchBar />
          </div>

          {/* Phone quick-link */}
          <p className="mt-6 text-light-muted text-sm">
            Oder rufen Sie uns an:{' '}
            <a
              href={CONTACT_INFO.phoneHref}
              className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
            >
              {CONTACT_INFO.phone}
            </a>
          </p>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="bg-dark-800 border-y border-dark-600 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+', label: 'Jahre Erfahrung' },
              { value: '10.000+', label: 'Fahrten absolviert' },
              { value: '4.9★', label: 'Kundenbewertung' },
              { value: '24/7', label: 'Service verfügbar' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-black text-gold-400 mb-1">{item.value}</p>
                <p className="text-light-secondary text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-dark-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">Einfach &amp; schnell</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">So einfach geht&apos;s</h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dashed connector (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-dark-600 z-0" />

            {[
              {
                num: '1',
                icon: '📍',
                title: 'Adresse eingeben',
                desc: 'Start- und Zieladresse angeben, Datum und Uhrzeit wählen.',
              },
              {
                num: '2',
                icon: '🚕',
                title: 'Fahrzeug wählen',
                desc: 'Passende Fahrzeugklasse für Ihr Gepäck und Ihre Gruppe auswählen.',
              },
              {
                num: '3',
                icon: '✈️',
                title: 'Komfortabel ankommen',
                desc: 'Entspannt reisen, Fahrer erwartet Sie pünktlich an der Tür.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative z-10 bg-dark-700 border border-dark-600 rounded-2xl p-8 text-center hover:border-gold-500 transition-colors duration-300"
              >
                {/* Number badge */}
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-dark-900 font-black text-lg leading-none">{step.num}</span>
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-light-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section className="bg-dark-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">Für jeden Bedarf</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Unsere Fahrzeugklassen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fleetData.map((vehicle) => (
              <div
                key={vehicle.type}
                className={`relative bg-dark-700 border rounded-2xl p-7 hover:border-gold-500 transition-all duration-300 hover:-translate-y-1 ${
                  vehicle.popular ? 'border-gold-500 shadow-lg shadow-gold-500/10' : 'border-dark-600'
                }`}
              >
                {vehicle.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-dark-900 text-xs font-bold px-4 py-1 rounded-full">
                    Beliebt
                  </div>
                )}
                <div className="text-4xl mb-4">{vehicle.icon}</div>
                <h3 className="text-white font-bold text-xl mb-1">{vehicle.type}</h3>
                <p className="text-light-muted text-sm mb-3">
                  {vehicle.persons} Personen &middot; {vehicle.luggage}
                </p>
                <p className="text-gold-400 font-black text-3xl mb-5">
                  ab {formatPrice(vehicle.basePrice)}
                </p>
                <ul className="space-y-2 mb-6">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-light-secondary text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/fahrzeuge`}
                  className="block w-full text-center bg-dark-600 hover:bg-gold-500 hover:text-dark-900 text-light-secondary font-semibold text-sm py-2.5 rounded-xl transition-all duration-200"
                >
                  Mehr erfahren
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR CITIES ─── */}
      <section className="bg-dark-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">Wohin fahren Sie?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Beliebte Ziele</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${locale}/blog/${city.slug}`}
                className="group flex items-center justify-between bg-dark-700 border border-dark-600 hover:border-gold-500 rounded-xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-gold-400 transition-colors">
                    {city.name}
                  </p>
                  <p className="text-light-muted text-xs mt-0.5">
                    {city.distance_km} km &middot; ab {formatPrice(city.kombi_price)}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors"
            >
              Alle Städte anzeigen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-dark-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">Kundenstimmen</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Was unsere Kunden sagen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-dark-700 border border-dark-600 rounded-2xl p-7 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-light-secondary text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-2 pt-4 border-t border-dark-600">
                  <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-400 font-bold text-xs">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.author}</p>
                    <p className="text-light-muted text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-dark-900 border-t border-dark-600 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, #d4af6a 0%, #f0d080 50%, #c9a84c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Bereit für Ihre Fahrt?
          </h2>
          <p className="text-light-secondary text-lg mb-10">
            Buchen Sie jetzt Ihren zuverlässigen Flughafentransfer – schnell, einfach und zum Festpreis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}#search`}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-gold-500/30 hover:scale-105 w-full sm:w-auto justify-center"
            >
              Jetzt buchen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center gap-2 border-2 border-dark-600 hover:border-gold-500 text-white hover:text-gold-400 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
