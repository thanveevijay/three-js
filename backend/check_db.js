const mongoose = require('mongoose');
const Member = require('./models/Member');

async function check() {
  try {
    await mongoose.connect('mongodb://localhost:27017/teammanagement');
    const count = await Member.countDocuments();
    console.log('Member count in DB:', count);
    const members = await Member.find().limit(1);
    console.log('Sample member:', members[0]);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
