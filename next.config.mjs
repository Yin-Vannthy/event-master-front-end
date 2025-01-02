/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next';
import dotenv from 'dotenv';
dotenv.config();
const nextConfig = {
    env : {
      BASE_URL : process.env.API_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'http',
                hostname: '34.124.203.109',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            }
        ],
    }
};

export default withPlaiceholder(nextConfig)