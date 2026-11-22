const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
const Member = require('../models/Member');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, unique + extension);
  },
});
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, WEBP, and GIF images are allowed.'));
    }
    cb(null, true);
  },
});

// POST /api/members - Add new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, roll, year, degree, project, hobbies, certificate, internship, aim } = req.body;
    if (!name || !roll || !year || !degree) {
      return res.status(400).json({ error: 'Name, roll, year, and degree are required.' });
    }
    const member = new Member({
      name, roll, year, degree, project, hobbies, certificate, internship, aim,
      image: req.file ? req.file.filename : null,
    });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/members/:id - Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;