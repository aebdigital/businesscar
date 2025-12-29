import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = ({
  title = 'Business Car Autopožičovňa Bratislava, Osobná preprava Bratislava, Viedeň, Slovensko',
  description = 'Autopožičovňa s priateľským prístupom. Vozidlá s automatickou prevodovkou a navigáciou pristavíme priamo ku Vám.',
  keywords = 'autopozicovna, autopozicovna bratislava, preprava osôb, preprava osob, prenájom vozidiel, doprava bratislava, pozicovna aut, pozicovna aut bratislava, preprava',
  image = '/main-page-final1.jpg',
  url = 'https://businesscar.sk',
  type = 'website',
  author = 'Business Car',
  locale = 'sk_SK'
}) => {
  const location = useLocation();
  const currentUrl = `${url}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property, content, name = false) => {
      const selector = name ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let tag = document.querySelector(selector);

      if (!tag) {
        tag = document.createElement('meta');
        if (name) {
          tag.setAttribute('name', property);
        } else {
          tag.setAttribute('property', property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const updateLinkTag = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    // Basic SEO meta tags
    updateMetaTag('description', description, true);
    updateMetaTag('keywords', keywords, true);
    updateMetaTag('author', author, true);
    updateMetaTag('robots', 'index, follow', true);
    updateMetaTag('googlebot', 'index, follow', true);
    updateMetaTag('bingbot', 'index, follow', true);
    updateMetaTag('language', 'Slovak', true);

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:image', `${url}${image}`);
    updateMetaTag('og:image:alt', 'Business Car Autopožičovňa Bratislava');
    updateMetaTag('og:site_name', 'Business Car Autopožičovňa Bratislava, Osobná preprava Bratislava, Viedeň, Slovensko');
    updateMetaTag('og:locale', locale);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:type', 'image/jpeg');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', `${url}${image}`, true);
    updateMetaTag('twitter:image:alt', 'Business Car Autopožičovňa Bratislava', true);

    // Additional SEO tags
    updateMetaTag('theme-color', '#ffffff', true);
    updateMetaTag('msapplication-TileColor', '#ffffff', true);
    updateMetaTag('mobile-web-app-capable', 'yes', true);
    updateMetaTag('apple-mobile-web-app-capable', 'yes', true);
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent', true);
    updateMetaTag('apple-mobile-web-app-title', 'Business Car', true);

    // Canonical URL
    updateLinkTag('canonical', currentUrl);

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CarRental",
      "name": "Business Car",
      "description": "Autopožičovňa s priateľským prístupom. Vozidlá s automatickou prevodovkou a navigáciou pristavíme priamo ku Vám.",
      "url": url,
      "logo": `${url}/logoRENT.svg`,
      "image": `${url}${image}`,
      "telephone": "+421 905 318 164",
      "email": "info@businesscar.sk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Františkánske námestie 8",
        "addressLocality": "Bratislava",
        "postalCode": "811 01",
        "addressCountry": "SK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.1451,
        "longitude": 17.1077
      },
      "openingHours": [
        "Mo-Su 08:00-20:00"
      ],
      "priceRange": "€€€",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Prenájom áut",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Car",
              "name": "Luxusné vozidlá",
              "brand": ["BMW", "Audi", "Mercedes-Benz", "Maserati"]
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.facebook.com/people/Lerentsk/61582767697078/",
        "https://www.instagram.com/lerent.sk/"
      ]
    };

    // Remove existing JSON-LD script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new JSON-LD script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, currentUrl, url, type, author, locale]);

  return null;
};

export default SEOHead;
