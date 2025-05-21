import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/lineData", (req, res) => {
  res.json([
    { label: "Enero", Ads: 1, Subscriptions: 30, Sponsorships: 15 },
    { label: "Febrero", Ads: 25, Subscriptions: 35, Sponsorships: 18 },
    { label: "Marzo", Ads: 30, Subscriptions: 40, Sponsorships: 20 },
    { label: "Abril", Ads: 28, Subscriptions: 42, Sponsorships: 22 },
    { label: "Mayo", Ads: 32, Subscriptions: 45, Sponsorships: 23 }
  ]);
});

app.get("/api/doughnutData", (req, res) => {
  res.json([
    { label: "llegadas Temprano", value: 33 },
    { label: "llegadas Tarde", value: 20 }
  ]);
});

app.get("/api/barData", (req, res) => {
  res.json([
    { label: "Enero", Ads: 1, Subscriptions: 30, Sponsorships: 15 },
    { label: "Febrero", Ads: 25, Subscriptions: 35, Sponsorships: 18 },
    { label: "Marzo", Ads: 30, Subscriptions: 40, Sponsorships: 20 },
    { label: "Abril", Ads: 28, Subscriptions: 42, Sponsorships: 22 },
    { label: "Mayo", Ads: 32, Subscriptions: 45, Sponsorships: 23 }
  ]);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
