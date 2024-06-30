// app/components/SEOHead.tsx
import type { Metadata } from 'next';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export const generateMetadata = ({ title, description, url, imageUrl }: SEOHeadProps): Metadata => {
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      siteName: 'Steam Workshop Mod Fetcher',
    },
  };
};
