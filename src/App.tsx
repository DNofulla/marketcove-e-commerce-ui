function App() {
  const title = import.meta.env.VITE_APP_TITLE;
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  return (
    <div>
      <h1>{title}</h1>
      <p>Stripe Key: {stripeKey}</p>
    </div>
  );
}

export default App;
