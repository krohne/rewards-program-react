# React + Vite

## Homework Assignment: Rewards Program Demo

This project is a demonstration of coding style and abilities through a homework assignment. The goal is to showcase how to approach code, structure a project, and adhere to industry standards and best practices.

**Assignment Prompt:**

> Imagine you are starting a new job, and this is your first task. You would likely want to put your best self forward; creating code that is clear, logical, and adheres to industry standards and best practices.

**App Header:**

The app prominently displays the title "Homework Assignment: Rewards Program Demo" above the Vite and React logos, making the assignment context clear at the top of the UI.

This app simulates a retail rewards program, including:
- Asynchronous fetching of random transaction data for multiple customers over three months
- Calculation of reward points per transaction and per customer/month using a clear formula
- Modular, idiomatic React code with separation of concerns, accessibility, and maintainability in mind
- Clean UI with summary and detail tables

---

## Deployment Instructions

You can easily deploy this Vite + React app to Vercel, Netlify, or GitHub Pages. Here are some quick start instructions:

### Deploy to Vercel
1. Push your project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and import your repository.
3. Vercel will auto-detect the Vite project. Click "Deploy".

### Deploy to Netlify
1. Push your project to a GitHub repository.
2. Go to [netlify.com](https://www.netlify.com/) and connect your repository.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Click "Deploy".

### Deploy to GitHub Pages
1. Build the app locally: `npm run build`
2. Install the [vite-plugin-gh-pages](https://www.npmjs.com/package/vite-plugin-gh-pages) or use a deploy script.
3. Push the contents of the `dist` folder to the `gh-pages` branch of your repository.
4. Enable GitHub Pages in your repository settings, pointing to the `gh-pages` branch.

For more details, see the official Vite deployment guide: https://vitejs.dev/guide/static-deploy.html

---

This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
