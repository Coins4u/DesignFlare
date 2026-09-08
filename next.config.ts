import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid picking a parent-folder lockfile as the tracing root when multiple exist
  outputFileTracingRoot: __dirname,
  // Product ZIP templates under pack/ are customer downloads, not part of this app
  outputFileTracingExcludes: {
    '*': ['./pack/**/*', './midlleware/**/*'],
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/pack/**',
        '**/midlleware/**',
        '**/.git/**',
      ],
    };
    return config;
  },
};

export default nextConfig;
