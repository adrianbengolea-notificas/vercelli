import { site } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BusCompany",
    name: site.legalName,
    alternateName: site.name,
    url: site.originalUrl,
    email: site.email,
    telephone: site.phoneMain,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Perón 2425",
      addressLocality: "San Nicolás",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
