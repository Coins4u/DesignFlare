# Figma Handoff Spec — Coaching

## Project setup
- **Frame grid**: 8px base · 12-column desktop · 4-column mobile
- **Font**: Inter (400/600/700/800)
- **Primary**: #7c3aed · **Accent surface**: #f5f3ff

## Desktop 1440×1024 — `Coaching/Landing`
| Section | Height | Spec |
|---------|--------|------|
| Nav | 72px | Logo · 3 links · primary CTA · sticky blur bg |
| Hero | 640px | Split 55/45 · H1 56px · dual CTA · stat row |
| Logo strip | 96px | 5 grayscale logos · 40% opacity |
| Features | 520px | 3 cards · 24px radius · icon badge |
| Testimonial | 280px | Accent bg · centered quote |
| CTA | 320px | Card 680px wide · shadow xl |
| Footer | 120px | Legal links |

## Mobile 390×844
- Hamburger nav · stacked hero · single-column features

## Component naming (match CSS)
`Nav/Primary` · `Hero/Copy` · `Card/Feature` · `Button/Primary` · `Footer/Legal`

## Export
- Icons: SVG · Photos: WebP 2x · Redlines: 16px padding annotations

## Dev sync
HTML classes prefixed `df-` map 1:1 to this spec. See `coaching-landing.html`.
