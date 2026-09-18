# AeroIndex — Airfare Price Index & Intelligence Platform
**Smart India Hackathon 2026**

React 19 + Vite + Tailwind CSS + Recharts frontend, Express backend.

## Run

```bash
npm install
npm run dev        # starts API (port 5000) and web app (port 3000) together
```

Open http://localhost:3000

Other scripts: `npm run client` (frontend only), `npm run server` (API only),
`npm run build` / `npm run preview` (production build).

## Theme

All colours live in `tailwind.config.js`:

| Token      | Use                                   | Main value |
|------------|---------------------------------------|------------|
| `slate`    | Navy-tinted neutrals, sidebar, text   | `900 #0F1C38` |
| `blue`     | Brand royal blue — primary actions    | `600 #1F4FBF` |
| `saffron`  | Accent — active nav, index line, SIH  | `500 #F58A1F` |

Because `slate` and `blue` are remapped there, every page follows the theme
automatically. To rebrand, change those values only.
