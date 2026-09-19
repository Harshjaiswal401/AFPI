# ✈️ AFPI — AirFare PriceIndex

> A frontend-first statistical dashboard for exploring domestic airfare movements across India.

AFPI (AirFare PriceIndex) is a Vite-powered React application designed to visualize airfare observations, compare route-level price movements, and demonstrate how airfare data can support price-index analysis and CPI research.

The current version runs in **demo mode** with browser-local data. It is intentionally frontend-only and does not require an Express server, database, external API, or environment variables.

---

## ✨ Highlights

- **Airfare monitoring** across representative domestic routes
- **Airfare Price Index** views for understanding price movement over time
- **Route comparison** between selected city pairs
- **Advance-purchase analysis** using configurable booking windows
- **Interactive charts and dashboards** for exploring demo observations
- **Responsive interface** suitable for desktop and smaller screens
- **Simple Vite deployment** for hosting on Vercel or any static hosting provider

---

## 📊 Advance-purchase windows

AFPI can represent fares by the number of days between booking and travel. The demo model includes the following windows:

| Window | Meaning |
| --- | --- |
| `T+1` | Fare for travel tomorrow |
| `T+7` | Fare for travel in seven days |
| `T+15` | Fare for travel in fifteen days |
| `T+30` | Fare for travel in thirty days |
| `T+45` | Fare for travel in forty-five days |

These windows help illustrate how booking time, demand, seasonality, route popularity, airline pricing, and additional charges may influence observed fares.

---

## 🎯 Project objective

Airfares can change rapidly based on travel date, booking lead time, passenger demand, holidays, route popularity, airline pricing, and surcharges. Traditional periodic collection methods may not fully reflect these movements.

AFPI provides a conceptual workflow for:

1. Collecting airfare observations from airlines and online travel aggregators
2. Cleaning and normalizing observations across routes and booking windows
3. Comparing movements between city pairs
4. Converting observations into interpretable index indicators
5. Presenting results through an accessible statistical dashboard

> **Note:** The current repository contains a frontend demonstration with local data. Live airfare collection, production data pipelines, index methodology, and external integrations are not included yet.

---

## 🛠️ Technology

- [React](https://react.dev/) — user interface
- [Vite](https://vite.dev/) — development server and production build tool
- [Recharts](https://recharts.org/) — data visualization
- [Framer Motion](https://motion.dev/) — interface animations
- [Lucide React](https://lucide.dev/) — icons
- [Tailwind CSS](https://tailwindcss.com/) — styling utilities

---

## 🚀 Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/Harshjaiswal401/AFPI.git
cd AFPI
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite. It is normally:

```text
http://localhost:5173
```

### Create a production build

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

---

## ☁️ Deploy to Vercel

AFPI can be deployed as a static Vite application.

| Setting | Value |
| --- | --- |
| Framework preset | `Vite` |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

No environment variables are required for the current demo version. Dashboard data is supplied by the browser-local demo service in [`src/services/api.js`](src/services/api.js).

---

## 📁 Project structure

```text
AFPI/
├── src/
│   ├── services/       # Browser-local demo data service
│   ├── ...             # React application code and UI components
├── public/             # Static assets
├── index.html          # Application entry point
├── package.json        # Scripts and dependencies
└── vite.config.*       # Vite configuration
```

---

## 🔭 Potential next steps

- Connect the dashboard to a production airfare data source
- Add scheduled data collection and historical storage
- Define and document a transparent index methodology
- Add route, airline, seasonality, and fare-class dimensions
- Introduce automated data-quality checks and anomaly detection
- Add tests for normalization, aggregation, and index calculations
- Provide downloadable reports and API access

---

## ⚠️ Disclaimer

AFPI is an experimental demonstration and research-oriented frontend. The displayed values are local demo data and should not be interpreted as live market prices, official statistics, or an official Consumer Price Index measure.

---

## 📄 License

No license has been specified for this repository yet. Please contact the repository owner before using, modifying, or redistributing the code.

---

## 👤 Maintainer

Built and maintained by [Harsh Jaiswal](https://github.com/Harshjaiswal401).

If you have suggestions or feedback, please open an issue in the repository.
