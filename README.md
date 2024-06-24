### MarketCove E-Commerce Platform UI

Environment Setup before running:
- Create a `.env` file in the root directory
- Fill it with the following fields:

```javascript
VITE_APP_TITLE="MarketCove E-Commerce Platform"
VITE_STRIPE_PUBLISHABLE_KEY=""
```

To Run Locally run the following:
- `npm install`
- `npm run dev`

To Deploy using Docker run the following (build + run):
- `docker build -t marketcove-e-commerce-ui .`
- `docker run -p 5173:80 marketcove-e-commerce-ui`

