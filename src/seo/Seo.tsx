import { Helmet } from 'react-helmet-async';
import type { Page } from '../router';
import { pageMeta, siteMeta } from './seo';

/**
 * Per-page document head: title, meta description, canonical URL, and
 * Open Graph / Twitter tags so shared links render proper previews.
 */
const Seo: React.FC<{ page: Page }> = ({ page }) => {
  const meta = pageMeta[page];
  const url = `${siteMeta.baseUrl}${meta.path}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteMeta.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={siteMeta.ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={siteMeta.ogImage} />
    </Helmet>
  );
};

export default Seo;
