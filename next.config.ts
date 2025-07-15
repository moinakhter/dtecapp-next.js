import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['dtecapp-design.vercel.app'],  
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
