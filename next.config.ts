import type { NextConfig } from 'next';


const config: NextConfig = { 
  reactStrictMode: true, 

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
  },

};

export default config;
