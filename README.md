# QUOATZ Landing Page

Static Vite landing page for QUOATZ, a premium service marketplace for Users, Business Owners,
timed bidding, reverse auctions, subscription permissions, secure payments, and verified account
flows.

The site now includes a template-inspired shop page at `/shop.html` for browsing service request
templates and building a request tray.

## Documentation

- [How to run and review the landing page](docs/how-to-run-landing-page.md)
- [QUOATZ landing page reference](docs/reference-landing-page.md)
- [QUOATZ flow and stack explanation](docs/explanation-flow-and-stack.md)

## Run locally

Install dependencies and start Vite:

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

You can also open `index.html` directly for a simple static smoke check.

## Run with Docker

```bash
docker compose up --build -d
```

The Docker service is exposed at:

```text
http://127.0.0.1:9988/
```
