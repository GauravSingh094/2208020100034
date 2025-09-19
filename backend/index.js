import express from "express";
import mongoose from "mongoose";
import shortid from "shortid";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Schema
const UrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model("Url", UrlSchema);

// Create short URL
app.post("/api/shorten", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !/^https?:\/\//i.test(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    const shortId = shortid.generate();
    const newUrl = await Url.create({ originalUrl: url, shortId });
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/s/${shortId}`, shortId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect
app.get("/s/:shortId", async (req, res) => {
  const record = await Url.findOne({ shortId: req.params.shortId });
  if (!record) return res.status(404).send("URL not found");
  record.clicks++;
  await record.save();
  res.redirect(record.originalUrl);
});

// Stats
app.get("/api/stats/:shortId", async (req, res) => {
  const record = await Url.findOne({ shortId: req.params.shortId });
  if (!record) return res.status(404).json({ error: "Not found" });
  res.json(record);
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
