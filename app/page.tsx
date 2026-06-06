/**
 * Serves the existing static homepage from /public/index.html inside the Next app shell.
 * All /pack/* pages and assets are served from public/ as well.
 */
export default function Home() {
  return (
    <iframe
      src="/index.html"
      title="DesignFlare"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
    />
  );
}
