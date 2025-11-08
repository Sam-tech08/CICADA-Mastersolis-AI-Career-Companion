// Seed sample application documents into the 'application' collection.
// Usage: node scripts/seedApplications.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!uri) {
  console.error('Missing MONGODB_URI / DATABASE_URL in server/.env');
  process.exit(1);
}

const ApplicationSchema = new mongoose.Schema({
  jobId: String,
  jobTitle: String,
  company: String,
  appliedAt: Date,
  mode: String,
  resume: String
}, { collection: 'application', timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);

async function run() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  const now = new Date();
  const docs = [
    {
      jobId: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      appliedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      mode: 'smart',
      resume: 'Optimized resume text for Senior Frontend Developer'
    },
    {
      jobId: '2',
      jobTitle: 'Machine Learning Engineer',
      company: 'AI Solutions Ltd.',
      appliedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      mode: 'manual',
      resume: 'Uploaded resume text for ML Engineer'
    },
    {
      jobId: '3',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      appliedAt: now.toISOString(),
      mode: 'smart',
      resume: 'AI-optimized resume for Full Stack Developer'
    }
  ];

  const result = await Application.insertMany(docs);
  console.log(`Inserted ${result.length} application documents`);

  await mongoose.disconnect();
  console.log('Disconnected, seed complete');
}

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
