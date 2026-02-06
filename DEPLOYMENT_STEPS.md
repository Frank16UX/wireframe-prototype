# Deployment Guide: GitHub & Netlify

This guide documents the step-by-step process used to initialize Git, create a GitHub repository, and deploy the **wireframe-prototype** project to Netlify.

## 1. Project Configuration

### .gitignore Update
Ensured that build artifacts and environment variables are not tracked by Git.
- Added `node_modules`, `dist`, `.env*`, and `.netlify` to `.gitignore`.

### netlify.toml Creation
Created a `netlify.toml` file in the root directory to define build settings and handle client-side routing (SPA).

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 2. Git Initialization & GitHub Repository

Used the following commands in the terminal:

1.  **Initialize Git:**
    ```bash
    git init
    ```
2.  **Rename branch to main:**
    ```bash
    git branch -m main
    ```
3.  **Stage and Commit files:**
    ```bash
    git add .
    git commit -m "Initial commit: wireframe prototype"
    ```
4.  **Create GitHub Repo via CLI:**
    Used the GitHub CLI (`gh`) to create the repository and push the code in one step.
    ```bash
    gh repo create wireframe-prototype --public --source=. --remote=origin --push
    ```
    - **Repository URL:** [https://github.com/Frank16UX/wireframe-prototype](https://github.com/Frank16UX/wireframe-prototype)

## 3. Netlify Deployment

Since both GitHub and Netlify were authenticated, the following manual/automated steps were performed on [app.netlify.com](https://app.netlify.com):

1.  **Select "Add new site"** -> **"Import an existing project"**.
2.  **Connect Git Provider:** Selected **GitHub**.
3.  **Search for Repository:** Found and selected `Frank16UX/wireframe-prototype`.
4.  **Build Settings:** The settings were automatically detected from the `netlify.toml` file:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
5.  **Site Name Configuration:** In the site settings, ensure a descriptive project name is used (by default, matching the GitHub repository name).
6.  **Deploy Site:** Clicked the deploy button and waited for the build to complete.

## 4. Live Site
The application is live and accessible at:
**[https://mi-wireframe-prototype.netlify.app](https://mi-wireframe-prototype.netlify.app)**
