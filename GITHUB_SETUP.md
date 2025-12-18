# GitHub Repository Setup Guide

Your local Git repository is ready! Follow these steps to create and sync with GitHub:

## Step 1: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `todoApp-cursor` (or your preferred name)
   - **Description**: "Todo App with React frontend and Node.js backend" (optional)
   - **Visibility**: Choose **Public** or **Private**
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you setup instructions. Use these commands:

```bash
# Add the remote repository (replace hqasimorg with your actual GitHub username if different)
git remote add origin https://github.com/hqasimorg/todoApp-cursor.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify

1. Go back to your GitHub repository page
2. You should see all your files there
3. Your code is now synced! 🎉

## Troubleshooting

### If you get authentication errors:

**Option A: Use GitHub CLI (Recommended)**
```bash
gh auth login
git push -u origin main
```

**Option B: Use Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` scope
3. Use the token as your password when pushing

**Option C: Use SSH**
```bash
# Change remote to SSH
git remote set-url origin git@github.com:hqasimorg/todoApp-cursor.git
git push -u origin main
```

## Current Git Status

✅ Local repository initialized
✅ All files committed
✅ Ready to push to GitHub

Your current branch: `main`
Number of commits: 1 (Initial commit)

