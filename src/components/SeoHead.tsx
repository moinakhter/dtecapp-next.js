// components/SeoHead.tsx
import { useTranslations } from 'next-intl';
import Head from 'next/head';

interface SeoHeadProps {
  pageKey: string; 
}

export default function SeoHead({ pageKey }: SeoHeadProps) {
  const t = useTranslations('Metadata');

  return (
    <Head>
      <title>{t(`${pageKey}Title`)}</title>
      <meta name="description" content={t(`${pageKey}Description`)} />
      <meta property="og:title" content={t(`${pageKey}Title`)} />
      <meta property="og:description" content={t(`${pageKey}Description`)} />
      {/* Add your OG images and canonical URLs here */}
    </Head>
  );
}
