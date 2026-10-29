import type { NextConfig } from 'next';
const config: NextConfig = { allowedDevOrigins: ['terminal.local'], images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] } };
export default config;
