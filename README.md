## Setup Instructions

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Overview of your implementation

This project implements a Ecommerce store with Next.js. A product catalog with category filtering and sorting options is provided on the home page. Also, users have a shopping cart functionality to add, remove or update the quantities of cart items.

Additionally, users can click on a link on a product item to view more product details.

## Any assumptions or design decisions

Data Fetching is done in server components. These data is also cached given that this application with unchanging API responses can benefit from caching. In a real-world project, different caching options can be applied based on user requirements.

React Context is used as a global state provider for the cart state.

The state is also preserved in local storage to retain a cart state across user sessions

State such as current page, sort field and sort order are stored in search parameters so these states are preserved across page loads.

The category to filter by is added as a route parameter

## Technologies used

Next.js, TailwindCSS, ShadcnUI, SwiperJS for the carousel (uses RadixUI under the hood)
