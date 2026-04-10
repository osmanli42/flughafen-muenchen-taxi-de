import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MapPin, Clock, Users, Check, ChevronRight, Star, Car } from 'lucide-react';
import { citiesBySlug, allCitySlugs, CityData } from '@/lib/citiesData';
import enTranslations from '@/lib/citiesDataEn';
import { CONTACT_INFO } from '@/lib/utils';

const SITE_URL = 'https://www.flughafen-muenchen-taxi.de';

type Props = { params: { citySlug: string; locale: string } };

export async function generateStaticParams() {
  return allCitySlugs.map((slug) => ({ citySlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = citiesBySlug[params.citySlug];
  if (!city) return {};
  const isEN = params.locale === 'en';
  const title = isEN
    ? `Taxi ${city.name} to Munich Airport – Fixed Price €${city.kombi_price}`
    : `Taxi ${city.nameDE} Flughafen München – Festpreis ${city.kombi_price} €`;
  const description = isEN
    ? `Book your fixed-price taxi from ${city.name} to Munich Airport (MUC). ${city.distance_km} km, approx. ${city.drive_minutes} min. From €${city.kombi_price}. 24/7 service, free cancellation.`
    : `Taxi von ${city.nameDE} zum Flughafen München (MUC): ${city.distance_km} km, ca. ${city.drive_minutes} Min. Festpreis ab ${city.kombi_price} € – Jetzt online buchen! Kostenlose Stornierung, 24/7.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${params.locale === 'de' ? '' : params.locale + '/'}blog/${params.citySlug}`,
      languages: {
        de: `${SITE_URL}/blog/${params.citySlug}`,
        en: `${SITE_URL}/en/blog/${params.citySlug}`,
      },
    },
    openGraph: { title, description, type: 'article', url: `${SITE_URL}/blog/${params.citySlug}`, siteName: 'Flughafen-Muenchen-Taxi.de' },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

const countryFlag: Record<string, string> = { DE: '🇩🇪', AT: '🇦🇹', CH: '🇨🇭' };
const countryName: Record<string, string> = { DE: 'Deutschland', AT: 'Österreich', CH: 'Schweiz' };

export default function CityBlogPage({ params }: Props) {
  const city: CityData | undefined = citiesBySlug[params.citySlug];
  if (!city) notFound();

  const locale = params.locale;
  const isEN = locale === 'en';
  const t = isEN ? enTranslations[params.citySlug] : null;

  const desc     = t?.description ?? city.description;
  const hist     = t?.history     ?? city.history;
  const knownFor = t?.known_for   ?? city.known_for;
  const sights   = t?.sights      ?? city.sights;

  const ui = isEN ? {
    breadcrumbBlog: 'Blog',
    heroSubtitle: `Fixed-price airport transfer · ${city.distance_km} km · approx. ${city.drive_minutes} min`,
    cardDistance: 'Distance', cardTime: 'Travel time', cardKombi: 'Saloon (1–3)', cardVan: 'Van (4–7)',
    ctaTitle: 'Book your transfer now', ctaSubtitle: 'Fixed price · No hidden costs · 24/7',
    ctaBook: 'Book online', ctaCall: 'Call now',
    overviewTitle: `${city.name} – Overview`,
    statsLabel: ['Residents', 'Population growth', 'Area', 'Elevation'],
    historyTitle: `History of ${city.name}`,
    sightsTitle: `Top Sights in ${city.name}`,
    sightsIntro: `${city.name} offers visitors numerous attractions:`,
    knownForLabel: 'Known for',
    highlightTitle: 'Top Attractions Nearby',
    transferTitle: `Taxi from ${city.name} to Munich Airport`,
    transferIntro: t?.intro ?? `From ${city.name} to Munich Airport (MUC) is approx. <strong>${city.distance_km} km</strong>. Travel time at normal traffic is about <strong>${city.drive_minutes} minutes</strong>. Our fixed-price service ensures you arrive stress-free and on time.`,
    kombiLabel: 'Saloon / Sedan', kombiDesc: '1–3 passengers · up to 3 suitcases',
    vanLabel: 'Van / MPV', vanDesc: '4–7 passengers · up to 6 suitcases',
    popularLabel: 'Most popular',
    includedTitle: 'Our fixed-price guarantee includes:',
    included: ['Free meet & greet in the terminal', 'Up to 60 min free waiting for delays', 'Real-time flight monitoring', 'No traffic or toll surcharges', 'Child seats on request (free)', 'Instant booking confirmation'],
    faqTitle: `FAQ – Taxi ${city.name} Munich Airport`,
    faqs: [
      { q: `How much does a taxi from ${city.name} to Munich Airport cost?`, a: `The fixed price from ${city.name} to Munich Airport (MUC) is €${city.kombi_price} for a saloon (1–3 passengers) or €${city.van_price} for a van (4–7 passengers). All prices include toll – no hidden charges.` },
      { q: `How long is the journey from ${city.name} to Munich Airport?`, a: `The journey takes approx. ${city.drive_minutes} minutes at normal traffic. Distance is ${city.distance_km} km.` },
      { q: 'Can I book and pay online?', a: 'Yes – book online and pay in advance. You receive an instant booking confirmation by e-mail.' },
      { q: `Does the taxi also go from Munich Airport back to ${city.name}?`, a: `Absolutely! We monitor your flight and wait up to 60 minutes free of charge – even for delays.` },
    ],
    finalCtaTitle: `Book your taxi from ${city.name} now`,
    finalCtaSubtitle: `Fixed price from €${city.kombi_price} · Available 24/7 · Instant confirmation`,
    bookBtn: 'Book online',
    sidebarTitle: 'Book your transfer', sidebarFrom: 'from',
    sidebarKombi: 'Saloon (1–3 pax)', sidebarVan: 'Van (4–7 pax)',
    trust: ['Fixed price guaranteed', 'Free cancellation', 'Instant confirmation'],
    reviews: 'Based on 1,240+ reviews',
  } : {
    breadcrumbBlog: 'Blog',
    heroSubtitle: `Festpreis-Transfer · ${city.distance_km} km · ca. ${city.drive_minutes} Min. Fahrtzeit`,
    cardDistance: 'Entfernung', cardTime: 'Fahrtzeit', cardKombi: 'Kombi (1–3)', cardVan: 'Van (4–7)',
    ctaTitle: 'Jetzt Ihren Transfer buchen', ctaSubtitle: 'Festpreis garantiert · Keine Extrakosten · Rund um die Uhr',
    ctaBook: 'Online buchen', ctaCall: 'Jetzt anrufen',
    overviewTitle: `${city.nameDE} – Überblick`,
    statsLabel: ['Einwohner', 'Bevölkerungswachstum', 'Fläche', 'Höhe ü. NN'],
    historyTitle: `Geschichte von ${city.nameDE}`,
    sightsTitle: `Sehenswürdigkeiten in ${city.nameDE}`,
    sightsIntro: `${city.nameDE} bietet Besuchern zahlreiche Sehenswürdigkeiten:`,
    knownForLabel: 'Bekannt für',
    highlightTitle: 'Highlights & Top-Ausflugsziele',
    transferTitle: `Taxi von ${city.nameDE} zum Flughafen München (MUC)`,
    transferIntro: `Von ${city.nameDE} zum Flughafen München sind es ca. <strong>${city.distance_km} km</strong>. Die Fahrtzeit beträgt bei normaler Verkehrslage etwa <strong>${city.drive_minutes} Minuten</strong>. Unser Festpreisservice sorgt dafür, dass Sie stressfrei und pünktlich am Terminal ankommen.`,
    kombiLabel: 'Kombi / Limousine', kombiDesc: '1–3 Personen · bis 3 Koffer',
    vanLabel: 'Van / Großraumtaxi', vanDesc: '4–7 Personen · bis 6 Koffer',
    popularLabel: 'Beliebt',
    includedTitle: 'Unsere Festpreis-Garantie beinhaltet:',
    included: ['Kostenloser Meetservice im Terminal', '60 Minuten kostenlose Wartezeit bei Verspätungen', 'Echtzeit-Flugüberwachung (kein Aufpreis)', 'Kein Stau-Aufschlag, keine Mautkosten extra', 'Kindersitze auf Anfrage kostenlos', 'Sofortige Buchungsbestätigung per E-Mail'],
    faqTitle: `Häufige Fragen – Taxi ${city.nameDE} Flughafen München`,
    faqs: [
      { q: `Was kostet ein Taxi von ${city.nameDE} zum Flughafen München?`, a: `Der Festpreis von ${city.nameDE} zum Flughafen München (MUC) beträgt ${city.kombi_price} € für einen Kombi (1–3 Personen) bzw. ${city.van_price} € für einen Van (4–7 Personen). Alle Preise sind inklusive Maut – keine versteckten Kosten.` },
      { q: `Wie lange dauert die Fahrt von ${city.nameDE} nach Flughafen München?`, a: `Die Fahrt dauert ca. ${city.drive_minutes} Minuten bei normaler Verkehrslage. Die Entfernung beträgt ${city.distance_km} km.` },
      { q: 'Kann ich online buchen und bezahlen?', a: 'Ja – buchen Sie bequem online und bezahlen vorab. Sie erhalten eine sofortige Buchungsbestätigung per E-Mail.' },
      { q: `Fährt das Taxi auch vom Flughafen München zurück nach ${city.nameDE}?`, a: `Selbstverständlich! Wir überwachen Ihren Flug und warten bis zu 60 Minuten kostenlos – auch bei Verspätungen.` },
    ],
    finalCtaTitle: `Jetzt Taxi von ${city.nameDE} buchen`,
    finalCtaSubtitle: `Festpreis ab ${city.kombi_price} € · Rund um die Uhr verfügbar · Sofortbestätigung`,
    bookBtn: 'Online buchen',
    sidebarTitle: 'Transfer buchen', sidebarFrom: 'ab',
    sidebarKombi: 'Kombi (1–3 Pax)', sidebarVan: 'Van (4–7 Pax)',
    trust: ['Festpreis garantiert', 'Kostenlos stornieren', 'Sofortbestätigung'],
    reviews: 'Basierend auf 1.240+ Bewertungen',
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: ui.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/taxi-flughafen-muenchen` },
      { '@type': 'ListItem', position: 3, name: `Taxi ${city.nameDE} Flughafen München`, item: `${SITE_URL}/blog/${params.citySlug}` },
    ],
  };
  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'TaxiService',
    name: `Taxi ${city.nameDE} – Flughafen München`,
    description: `Festpreis-Taxi von ${city.nameDE} zum Flughafen München (MUC). ${city.distance_km} km, ca. ${city.drive_minutes} Minuten.`,
    provider: {
      '@type': 'LocalBusiness', name: 'Flughafen-Muenchen-Taxi.de', url: SITE_URL,
      telephone: CONTACT_INFO.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'München', addressCountry: 'DE' },
      priceRange: `${city.kombi_price}–${city.van_price} €`,
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1240' },
    },
    areaServed: { '@type': 'City', name: city.nameDE },
    offers: [
      { '@type': 'Offer', name: isEN ? 'Saloon' : 'Kombi', price: city.kombi_price, priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Van', price: city.van_price, priceCurrency: 'EUR' },
    ],
  };

  const bookingHref = `/${locale === 'de' ? '' : locale}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-10">
          <nav className="flex items-center gap-1.5 text-xs text-primary-300 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog/taxi-flughafen-muenchen" className="hover:text-white transition-colors">{ui.breadcrumbBlog}</Link>
            <ChevronRight size={12} />
            <span className="text-white">Taxi {city.nameDE}</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-sm mb-4">
            <span>{countryFlag[city.country]}</span>
            <span className="text-primary-200">{countryName[city.country]}</span>
            {city.district && <><span className="text-primary-400">·</span><span className="text-primary-200">{city.district}</span></>}
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
            Taxi {city.nameDE} →{' '}
            <span className="text-gold-400">{isEN ? 'Munich Airport' : 'Flughafen München'}</span>
          </h1>
          <p className="text-primary-200 text-lg mb-8">{ui.heroSubtitle}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: <MapPin size={18} />, value: `${city.distance_km} km`, label: ui.cardDistance },
              { icon: <Clock size={18} />, value: `~${city.drive_minutes} min`, label: ui.cardTime },
              { icon: <Car size={18} />, value: `${city.kombi_price} €`, label: ui.cardKombi },
              { icon: <Users size={18} />, value: `${city.van_price} €`, label: ui.cardVan },
            ].map(({ icon, value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                <span className="text-gold-400 flex-shrink-0">{icon}</span>
                <div>
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs text-primary-300">{label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-primary-200">
            {['✓ Festpreis garantiert', '✓ Keine Extrakosten', '✓ 24/7 Service', '✓ Kostenlose Stornierung'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">

          <article>
            {/* Mobile CTA */}
            <div className="lg:hidden bg-primary-600 text-white rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-lg">{ui.ctaTitle}</p>
                <p className="text-primary-200 text-sm">{ui.ctaSubtitle}</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link href={bookingHref} className="bg-gold-400 hover:bg-gold-300 text-primary-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  {ui.ctaBook}
                </Link>
                <a href={`tel:${CONTACT_INFO.phone}`} className="border border-white/50 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
                  <Phone size={14} /> {ui.ctaCall}
                </a>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">{ui.overviewTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: ui.statsLabel[0], value: city.population.toLocaleString('de-DE'), sub: `(${city.population_year})`, green: false },
                  { label: ui.statsLabel[1], value: city.population_growth, sub: '', green: true },
                  { label: ui.statsLabel[2], value: `${city.area_km2} km²`, sub: '', green: false },
                  { label: ui.statsLabel[3], value: `${city.elevation_m} m`, sub: '', green: false },
                ].map(({ label, value, sub, green }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">{label}</div>
                    <div className={`font-bold text-sm ${green ? 'text-green-600' : 'text-gray-900'}`}>{value}</div>
                    {sub && <div className="text-xs text-gray-400">{sub}</div>}
                  </div>
                ))}
              </div>
            </section>

            {/* History */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">{ui.historyTitle}</h2>
              <div className="border-l-4 border-gold-400 pl-5">
                <p className="text-gray-600 leading-relaxed">{hist}</p>
              </div>
            </section>

            {/* Sights */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">{ui.sightsTitle}</h2>
              <p className="text-gray-500 mb-4 text-sm">{ui.sightsIntro}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {sights.map((sight, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{sight}</span>
                  </div>
                ))}
              </div>
              {knownFor && (
                <div className="mt-5 flex items-start gap-2 bg-gold-50 border border-gold-200 rounded-xl px-4 py-3 text-sm">
                  <Star size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700"><span className="font-semibold">{ui.knownForLabel}:</span> {knownFor}</p>
                </div>
              )}
            </section>

            {/* Highlights */}
            {city.highlight && city.highlight.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">{ui.highlightTitle}</h2>
                <div className="space-y-4">
                  {city.highlight.map((h, i) => (
                    <div key={i} className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center flex-shrink-0">
                          <Star size={14} />
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{isEN ? h.titleEN : h.titleDE}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{isEN ? h.textEN : h.textDE}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Transfer / Pricing */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">{ui.transferTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm" dangerouslySetInnerHTML={{ __html: ui.transferIntro }} />

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {/* Kombi card */}
                <div className="relative border-2 border-gold-400 rounded-2xl p-6 bg-gradient-to-br from-gold-50 to-white shadow-md">
                  <div className="absolute -top-3 left-4 bg-gold-400 text-primary-900 text-xs font-bold px-3 py-0.5 rounded-full">{ui.popularLabel}</div>
                  <div className="text-3xl mb-3">🚗</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{ui.kombiLabel}</h3>
                  <p className="text-gray-500 text-sm mb-4">{ui.kombiDesc}</p>
                  <div className="text-4xl font-black text-primary-600 mb-5">{city.kombi_price} <span className="text-xl font-bold">€</span></div>
                  <Link href={bookingHref} className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors">
                    {ui.ctaBook}
                  </Link>
                </div>
                {/* Van card */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                  <div className="text-3xl mb-3">🚐</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{ui.vanLabel}</h3>
                  <p className="text-gray-500 text-sm mb-4">{ui.vanDesc}</p>
                  <div className="text-4xl font-black text-gray-700 mb-5">{city.van_price} <span className="text-xl font-bold">€</span></div>
                  <Link href={bookingHref} className="block w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-bold py-3 rounded-xl text-center text-sm transition-colors">
                    {ui.ctaBook}
                  </Link>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
                <p className="font-bold text-gray-900 mb-4">{ui.includedTitle}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {ui.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">{ui.faqTitle}</h2>
              <div className="space-y-3">
                {ui.faqs.map(({ q, a }, i) => (
                  <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center cursor-pointer px-5 py-4 font-semibold text-gray-800 hover:bg-gray-50 select-none transition-colors">
                      <span className="pr-4 text-sm md:text-base">{q}</span>
                      <span className="w-7 h-7 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-lg font-bold flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="px-5 pb-4 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50">{a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 text-center">
              <h2 className="text-2xl font-black mb-2">{ui.finalCtaTitle}</h2>
              <p className="text-primary-200 mb-6 text-sm">{ui.finalCtaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={bookingHref} className="bg-gold-400 hover:bg-gold-300 text-primary-900 font-black px-8 py-3 rounded-xl transition-colors">
                  {ui.bookBtn}
                </Link>
                <a href={`tel:${CONTACT_INFO.phone}`} className="border-2 border-white/50 hover:bg-white/10 text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Phone size={18} /> {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </article>

          {/* ── Sticky Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary-600 px-5 py-4">
                  <p className="text-white font-bold text-lg">{ui.sidebarTitle}</p>
                  <p className="text-primary-200 text-xs mt-0.5">Taxi {city.nameDE} → MUC</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gold-50 border border-gold-200 rounded-xl">
                      <div>
                        <div className="text-xs font-medium text-gray-700">{ui.sidebarKombi}</div>
                        <div className="text-xs text-gray-400">{ui.sidebarFrom}</div>
                      </div>
                      <div className="text-2xl font-black text-primary-600">{city.kombi_price} €</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <div>
                        <div className="text-xs font-medium text-gray-700">{ui.sidebarVan}</div>
                        <div className="text-xs text-gray-400">{ui.sidebarFrom}</div>
                      </div>
                      <div className="text-2xl font-black text-gray-700">{city.van_price} €</div>
                    </div>
                  </div>
                  <Link href={bookingHref} className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl text-center transition-colors">
                    {ui.ctaBook} →
                  </Link>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center justify-center gap-2 w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-bold py-3 rounded-xl transition-colors text-sm">
                    <Phone size={16} /> {CONTACT_INFO.phone}
                  </a>
                  <div className="space-y-2 pt-1 border-t border-gray-100">
                    {ui.trust.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check size={13} className="text-green-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-gold-400 fill-gold-400" />)}
                  <span className="text-sm font-bold text-gray-900 ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500">{ui.reviews}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
