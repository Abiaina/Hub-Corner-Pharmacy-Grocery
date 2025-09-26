# Lake City Access Map

A comprehensive web application for analyzing grocery and pharmacy service areas in Lake City, Seattle, with interactive mapping, scenario analysis, and proposed solutions.

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet.js (HTML/CSS/JS implementation)
- **Data**: GeoJSON format for geographic data
- **Deployment**: GitHub Pages

## Project Structure

### Supported Pages

- `/` - Home page with overview and navigation
- `/enhanced-map.html` - Interactive map with scenario toggles and service area analysis
- `/solutions.html` - Comprehensive solutions for addressing access gaps
- `/references.html` - Key data, regulations, and resources

### Key Features

- **Interactive Mapping**: Distance-based service area analysis with 0.5, 1, and 2-mile radius options
- **Scenario Toggles**: Compare current state, baseline state, and proposed solutions
- **Service Area Visualization**: Color-coded circles showing pharmacy and grocery coverage
- **Lake City Focus**: Specific analysis of Lake City area with potential desert identification
- **Comprehensive Solutions**: Short-term and long-term approaches including interim pharmacy, co-op development, and hub-spoke models

### Data Sources

- Current grocery stores and pharmacies
- Recently closed stores (Fred Meyer, Walgreens, Bartell)
- Proposed interim pharmacy locations
- Potential sites for new development
- Lake City boundary and demographic data

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The application is configured for GitHub Pages deployment. See `GITHUB_PAGES_SETUP.md` for detailed instructions.

## Key Features

- **No API Keys Required** - Uses OpenStreetMap tiles
- **Responsive Design** - Works on all device sizes
- **Accessibility** - Semantic HTML and keyboard navigation
- **Performance Optimized** - Static generation where possible

## License

This project is for demonstration purposes. Please ensure compliance with data usage rights and licensing requirements for any production deployment.