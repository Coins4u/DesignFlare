'use client';

import { useState, useCallback } from 'react';
import type { UgcGalleryTab } from './ugc-gallery.types';

export function useUgcGallery() {
  const [tab, setTab] = useState<UgcGalleryTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'UGC Gallery' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
