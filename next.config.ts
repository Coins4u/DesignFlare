import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid picking a parent-folder lockfile as the tracing root when multiple exist
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
