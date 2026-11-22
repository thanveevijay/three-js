const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
const Member = require('../models/Member');

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

function sendServerError(res) {
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
}

// POST /api/members - Add new member
router.post('/', upload.single('image'), async (req, res) => {
  let uploadedPath = req.file ? path.join(uploadsDir, req.file.filename) : null;
  try {
    const { name, roll, year, degree, project, hobbies, certificate, internship, aim } = req.body;
    if (![name, roll, year, degree].every(value => typeof value === 'string' && value.trim())) {
      if (uploadedPath) fs.unlink(uploadedPath, () => {});
      return res.status(400).json({ error: 'Name, roll, year, and degree are required.' });
    }
    const member = new Member({
      name: name.trim(),
      roll: roll.trim(),
      year: year.trim(),
      degree: degree.trim(),
      project, hobbies, certificate, internship, aim,
      image: req.file ? req.file.filename : null,
    });
    await member.save();
    return res.status(201).json(member);
  } catch (_err) {
    if (uploadedPath) fs.unlink(uploadedPath, () => {});
    return sendServerError(res);
  }
});

// GET /api/members - Get all members
router.get('/', async (_req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    return res.json(members);
  } catch (_err) {
    return sendServerError(res);
  }
});

// GET /api/members/:id - Get single member
router.get('/:id', async (req, res) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ error: 'Invalid member id.' });
    }
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found.' });
    return res.json(member);
  } catch (_err) {
    return sendServerError(res);
  }
});

module.exports = router;
