# GitHub Pages Setup Guide

## Fix for Permission Denied Error (403)

The error you're seeing is because the GitHub Actions bot doesn't have permission to push to your repository. Here's how to fix it:

### Step 1: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click "Settings" tab** (at the top of the repository)
3. **Scroll down to "Pages" section** (in the left sidebar)
4. **Under "Source":**
   - Select **"GitHub Actions"**
   - Click **"Save"**

### Step 2: Fix Repository Permissions

1. **In the same Settings page:**
2. **Click "Actions" in the left sidebar**
3. **Under "General":**
   - Scroll down to **"Workflow permissions"**
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
   - Click **"Save"**

### Step 3: Push the Updated Workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Switch to official GitHub Pages deployment"
git push origin main
```

### Step 4: Monitor the Deployment

1. **Go to "Actions" tab** in your repository
2. **Click on the latest workflow run**
3. **Watch the "build" job** - it should succeed
4. **Watch the "deploy" job** - it should deploy to Pages

## What the Updated Workflow Does

The workflow now uses GitHub's official Pages deployment actions:
- `actions/configure-pages@v4` - Sets up Pages
- `actions/upload-pages-artifact@v3` - Uploads build artifacts
- `actions/deploy-pages@v4` - Official GitHub Pages deployment
- No need to create branches or push to repository

## If It Still Fails

### Check These Common Issues:

1. **Repository Visibility:**
   - Make sure your repository is **public** (GitHub Pages requires public repos for free accounts)
   - Or upgrade to GitHub Pro if you want private repo Pages

2. **Branch Protection:**
   - Go to Settings → Branches
   - Make sure the `main` branch doesn't have restrictions that block Actions

3. **Organization Settings:**
   - If this is an organization repo, check organization settings for Pages restrictions

### Alternative: Manual Pages Setup

If the automatic enablement still doesn't work:

1. **Go to Settings → Pages**
2. **Under "Source", select "Deploy from a branch"**
3. **Select "main" branch and "/ (root)" folder**
4. **Click Save**
5. **Wait 5 minutes, then change back to "GitHub Actions"**
6. **Click Save again**

This forces GitHub to recognize the Pages setup.

## Expected Result

Once successful, your site will be available at:
`https://[your-username].github.io/[repository-name]`

The deployment should take 2-3 minutes after the workflow completes.
