import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(new URL('..', import.meta.url)));
const pub = path.join(root, 'public');

const files = [
  'index.html',
  'styles.css',
  'lead-form.css',
  'script.js',
  'robots.txt',
  'sitemap.xml',
  'about.html',
  'dmca.html',
  'privacy.html',
  'refund.html',
  'terms.html',
  'templates.html',
  'contact.html',
  'thank-you.html',
  'default.php',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
];

await mkdir(pub, { recursive: true });

for (const f of files) {
  const src = path.join(root, f);
  try {
    await cp(src, path.join(pub, f), { force: true });
    console.log('copied', f);
  } catch {
    /* optional file */
  }
}

try {
  await cp(path.join(root, 'images'), path.join(pub, 'images'), { recursive: true, force: true });
  console.log('copied images/');
} catch {
  /* optional */
}

await cp(path.join(root, 'pack'), path.join(pub, 'pack'), { recursive: true, force: true });
console.log('copied pack/');

try {
  await cp(path.join(root, 'legal', 'pdfs'), path.join(pub, 'legal', 'pdfs'), {
    recursive: true,
    force: true,
  });
  console.log('copied legal/pdfs/');
} catch {
  /* optional */
}

console.log('public/ is in sync with project root assets.');
