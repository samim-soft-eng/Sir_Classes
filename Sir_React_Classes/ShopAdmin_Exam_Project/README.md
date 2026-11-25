# ShopAdmin

A responsive React storefront dashboard with product search, filters, cart management, checkout, and order history. Product data comes from [Fake Store API](https://fakestoreapi.com/products); the demo account, cart, and orders are stored in browser local storage.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Demo sign-in

Enter any valid email address and a password of at least six characters. This is a front-end demo only; it does not authenticate against a server.

## Features

- Protected dashboard routes and local sign-in state
- Product listing with API loading/error states, name search, category filter, and price sorting
- Product details and add-to-cart controls
- Persistent cart with quantity controls, a 5% discount, and 8% tax calculation
- Checkout form validation, saved orders, and order detail modal
- Responsive layout for desktop and mobile
