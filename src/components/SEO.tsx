import React from "react";
import { Helmet } from "react-helmet-async";
import type { Profile } from "../types/profile";

interface SEOProps {
  portfolio:
    Profile
}

export default function SEO({ portfolio }: SEOProps) {
  
  if (!portfolio) return null;

  const {
    Hero,
    site_name,
    logo_url,
  } = portfolio;

  const fullName = `${Hero.firstName} ${Hero.lastName}`;
  const title = `${fullName} – ${Hero.description || "Portfolio"}`;
  const description =
    Hero.bio || `${fullName}'s personal portfolio`;

  const image =
    logo_url ||
    "/react.svg";

  const siteUrl = `https://${site_name}.vercel.app`;

  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta */}
      <meta name="description" content={description} />
      <meta name="author" content={fullName} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href={image} type="image/x-icon" />
      <link rel="apple-touch-icon" href={image} />

      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: fullName,
          url: siteUrl,
          image: image,
          jobTitle: "Web Developer",
          sameAs: [
            portfolio.socialLinks?.github,
            portfolio.socialLinks?.linkedin,
          ].filter(Boolean),
        })}
      </script>
    </Helmet>
  );
}
