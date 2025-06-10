
import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
 

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function PathnamesPage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('PathnamesPage');

  return (
  
      <div className="max-w-[490px]">
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </div>
 
  );
}