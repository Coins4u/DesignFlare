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
  'default.php',
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
console.log('public/ is in sync with project root assets.');
