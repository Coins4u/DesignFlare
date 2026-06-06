import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const packDir = path.join(root, 'pack');

const NOTE_LIGHT = `
                <div class="df-billing-note">
                    <p class="df-billing-note-title"><i class="fas fa-globe-europe mr-1"></i> Billing &amp; Localization Note</p>
                    <p class="df-billing-note-text">DesignFlare operates a dynamic global ledger. All base digital assets are denominated in our primary corporate currency node. Listed Euro (€) checkout rates are calculated in real-time utilizing localized payment processing rails to ensure zero conversion spreads at settlement. Your final invoice receipt will accurately reflect these precise values under your secure data license identifier.</p>
                </div>`;

const NOTE_DARK = `
                <div class="df-billing-note df-billing-note-dark">
                    <p class="df-billing-note-title"><i class="fas fa-globe-europe mr-1"></i> Billing &amp; Localization Note</p>
                    <p class="df-billing-note-text">DesignFlare operates a dynamic global ledger. All base digital assets are denominated in our primary corporate currency node. Listed Euro (€) checkout rates are calculated in real-time utilizing localized payment processing rails to ensure zero conversion spreads at settlement. Your final invoice receipt will accurately reflect these precise values under your secure data license identifier.</p>
                </div>`;

const MARKER = 'df-billing-note';

const files = (await readdir(packDir)).filter((f) => f.endsWith('.html') && !f.startsWith('standard'));

for (const file of files) {
  const filePath = path.join(packDir, file);
  let html = await readFile(filePath, 'utf8');

  if (html.includes(MARKER)) {
    console.log('skip (already has note):', file);
    continue;
  }

  const note = file === 'professional-suite.html' ? NOTE_DARK : NOTE_LIGHT;
  const anchor = '                </form>\n            </div>';

  if (!html.includes(anchor)) {
    console.warn('anchor not found:', file);
    continue;
  }

  html = html.replace(anchor, `                </form>${note}\n            </div>`);
  await writeFile(filePath, html);
  console.log('updated:', file);
}
