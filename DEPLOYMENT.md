# GitHub Pages Deployment Guide

## Quick Setup

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your GitHub repository
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically run
   - Check the "Actions" tab to see the deployment progress
   - Your site will be available at: `https://[username].github.io/[repository-name]`

## What's Included

### Static Export Configuration
- `next.config.mjs` configured for static export
- `output: 'export'` enables static file generation
- `images: { unoptimized: true }` for GitHub Pages compatibility

### GitHub Actions Workflow
- `.github/workflows/deploy.yml` handles automatic deployment
- Builds the Next.js app on every push to main branch
- Deploys static files to GitHub Pages

### New Pages
- **Homepage** (`/`) - Overview of the project
- **Grocery Stores Directory** (`/grocery-stores`) - Interactive directory showing:
  - Worker types (union, co-op, non-unionized)
  - Employment details and benefits
  - Store status and quality ratings
  - Filtering by worker type

## Features

### Grocery Store Directory Page
- **Interactive filtering** by worker type
- **Color-coded badges** for easy identification
- **Comprehensive data** including:
  - Union affiliations (UFCW 3000, UFCW Local 21)
  - Employee counts
  - Benefits information
  - Store quality ratings
  - Status (open, closing, etc.)

### Responsive Design
- Works on desktop, tablet, and mobile
- Clean, modern interface using Tailwind CSS
- Accessible navigation and interactions

## Manual Build (Optional)

If you want to test the build locally:

```bash
npm run build
```

The static files will be generated in the `out/` directory, which you can serve with any static file server.

## Troubleshooting

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`
- Verify Next.js configuration in `next.config.mjs`

### Deployment Issues
- Check GitHub Actions logs in the "Actions" tab
- Ensure GitHub Pages is enabled in repository settings
- Verify the workflow file is in `.github/workflows/deploy.yml`

### Data Loading Issues
- Ensure JSON data files are in `/public/data/` directory
- Check browser console for fetch errors
- Verify file paths in the code match actual file locations
