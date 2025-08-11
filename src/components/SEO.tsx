import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export function SEO({ title, description, image }: SEOProps) {
  const url = typeof window !== "undefined" ? window.location.href : undefined;
  const img = image || "https://lovable.dev/opengraph-image-p98pqg.png";
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}

export default SEO;
