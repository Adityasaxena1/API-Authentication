import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = process.env.USER_NAME;
const yourPassword = process.env.PASSWORD;
const yourAPIKey = process.env.API_KEY;
const yourBearerToken = process.env.BEARER_TOKEN;

app.get("/", (req, res) => {
  console.log(process.env.API_KEY);
  console.log(process.env.BEARER_TOKEN);
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/filter`,
      {
        params: {
          score: 5,
          apiKey: yourAPIKey,
        },
      }
    );
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/secrets/42",
      { headers: { Authorization: `Bearer ${yourBearerToken}` } }
    );
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
