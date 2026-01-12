import express from "express";
import multer from "multer";

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File tidak ditemukan" });
  }

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ error: "File harus berupa gambar" });
  }

  const base64 = req.file.buffer.toString("base64");
  const imageUrl = `data:${req.file.mimetype};base64,${base64}`;

  res.json({
    success: true,
    imageUrl
  });
});

export default app;
  
