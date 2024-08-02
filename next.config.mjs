/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    // esmExternals: 'loose', // <-- add this
    // serverComponentsExternalPackages: ['mongoose'],
  },
};

export default nextConfig;
