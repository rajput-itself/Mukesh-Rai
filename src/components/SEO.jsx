import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Mukesh Rai — Managing Director & Technology Executive',
  description = 'Executive portfolio of Mukesh Rai, Managing Director & CEO at AAPRIN Technologies & MPA Solution. Strategic leadership, enterprise architecture, AI systems, and digital transformation.',
  canonical = 'https://mukeshrai.com/',
  image = 'https://mukeshrai.com/portrait.webp',
  type = 'website'
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://mukeshrai.com/#person',
        name: 'Mukesh Rai',
        jobTitle: 'Managing Director & CEO',
        worksFor: [
          {
            '@type': 'Organization',
            name: 'AAPRIN Technologies & Solution LLP',
            url: 'https://aaprin.com'
          },
          {
            '@type': 'Organization',
            name: 'MPA Solution'
          }
        ],
        description: description,
        image: image,
        url: canonical,
        sameAs: [
          'https://www.linkedin.com',
          'https://aaprin.com'
        ],
        knowsAbout: [
          'Enterprise Software Architecture',
          'Cloud Microservices & Distributed Systems',
          'Applied Computer Vision & AI Systems',
          'Technology Governance & Leadership',
          'Digital Transformation'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pune',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mukeshrai.com/#website',
        url: canonical,
        name: 'Mukesh Rai — Executive Portfolio',
        description: description,
        publisher: {
          '@id': 'https://mukeshrai.com/#person'
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="Mukesh Rai, Technology Executive, Managing Director, CEO, AAPRIN Technologies, MPA Solution, Enterprise Architecture, Cloud Computing, Distributed Systems, Pune, India" />
      <meta name="author" content="Mukesh Rai" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Mukesh Rai — Technology Executive" />
      <meta property="og:site_name" content="Mukesh Rai" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Mukesh Rai — Technology Executive" />

      <meta name="theme-color" content="#08090d" />
      <meta name="msapplication-TileColor" content="#08090d" />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
