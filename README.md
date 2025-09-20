# Seattle Access Pilot

A production-ready Next.js application that compares Seattle food/pharmacy access for 2015 vs 2025, overlays a proposed pilot using repurposed large pharmacies as hubs and corner store-pharmacy hybrids, and includes comprehensive analysis pages.

## Tech Stack

- **Next.js 14+** (App Router)
- **React 18**
- **TypeScript** (strict mode)
- **Tailwind CSS 3.x**
- **Leaflet 1.9** (OpenStreetMap tiles)
- **Node.js 20.x LTS**

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

### Routes (App Router)

- `/` - Home page with overview and navigation
- `/seattle-2015-2025` - Interactive map with toggle between 2015, 2025, and proposed pilot
- `/pilot` - Detailed pilot overview featuring repurposed large pharmacies as hubs and corner store-pharmacy hybrids
- `/examples` - Examples from other cities and communities
- `/ppp` - Public-Private Partnership strategies and supply chain analysis

### Components

- `components/MapLeaflet.tsx` - Client component for Leaflet map integration
- `components/LegendToggle.tsx` - Three-state toggle component (2015/2025/Pilot)

### Data Files

Located in `/public/data/`:
- `tracts_2015.geojson` - Seattle census tracts with 2015 access data
- `tracts_2025.geojson` - Seattle census tracts with 2025 access data  
- `candidate_sites.geojson` - Proposed hub sites (repurposed large pharmacies) and corner store-pharmacy hybrid locations

## Features

### Interactive Mapping
- Toggle between 2015, 2025, and proposed pilot views
- Color-coded census tracts showing grocery/pharmacy access
- Interactive popups with detailed tract information
- Proposed hub and corner-pharmacy site visualization

### Data Visualization
- Access pattern comparison across time periods
- Population and income demographics
- Service coverage analysis
- Implementation timeline and metrics

### Content Pages
- Comprehensive pilot overview
- Case studies from other cities
- Partnership and funding strategies
- Risk management and success metrics

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Node Version

The project uses Node.js 20.x LTS. Use the included `.nvmrc` file:

```bash
nvm use
```

## Production Deployment

### GitHub Pages (Static Export)

This project is configured for static export and can be deployed to GitHub Pages:

1. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Source: "GitHub Actions"

2. **Automatic Deployment:**
   - Push to the `main` branch
   - The GitHub Actions workflow will automatically build and deploy

3. **Manual Build:**
   ```bash
   npm run build
   ```
   The static files will be generated in the `out/` directory.

### Local Production

```bash
npm run build
npm run start
```

## Key Features

- **No API Keys Required** - Uses OpenStreetMap tiles
- **SSR Compatible** - Properly handles server-side rendering
- **TypeScript Strict** - Full type safety
- **Responsive Design** - Works on all device sizes
- **Accessibility** - Semantic HTML and keyboard navigation
- **Performance Optimized** - Static generation where possible

## Data Schema

### Census Tracts (tracts_2015.geojson, tracts_2025.geojson)
```json
{
  "properties": {
    "tract_id": "string",
    "has_grocery": "boolean",
    "has_pharmacy": "boolean", 
    "population": "number",
    "median_income": "number"
  }
}
```

### Candidate Sites (candidate_sites.geojson)
```json
{
  "properties": {
    "site_id": "string",
    "site_type": "hub|corner_pharmacy",
    "name": "string",
    "capacity": "large|small",
    "services": ["string"]
  }
}
```

## License

This project is for demonstration purposes. Please ensure compliance with data usage rights and licensing requirements for any production deployment.
