# GitHub Pages Setup Guide

## Quick Fix for "Get Pages site failed" Error

### Step 1: Enable GitHub Pages Manually

1. **Go to your repository on GitHub**
2. **Click "Settings" tab** (at the top of the repository)
3. **Scroll down to "Pages" section** (in the left sidebar)
4. **Under "Source":**
   - Select **"Deploy from a branch"** (temporarily)
   - Select **"gh-pages"** branch and **"/ (root)"** folder
   - Click **"Save"**
   - Wait 30 seconds, then change back to **"GitHub Actions"**
   - Click **"Save"** again

### Step 2: Check Repository Permissions

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
git commit -m "Switch to peaceiris/actions-gh-pages for deployment"
git push origin main
```

### Step 4: Monitor the Deployment

1. **Go to "Actions" tab** in your repository
2. **Click on the latest workflow run**
3. **Watch the "build-and-deploy" job** - it should now succeed
4. **The workflow will create a `gh-pages` branch automatically**

## What the Updated Workflow Does

The workflow now uses `peaceiris/actions-gh-pages@v3` which:
- Creates a `gh-pages` branch automatically
- Pushes the built files to that branch
- Works with both "Deploy from a branch" and "GitHub Actions" sources

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
