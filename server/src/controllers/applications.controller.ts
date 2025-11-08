import { Request, Response } from 'express';
import Application from '../models/application.model';

/**
 * Create a new application.
 * Validation rules:
 * - appliedAt is required
 * - when mode === 'smart', resume must be a non-empty string
 * - resume will be truncated to 20000 chars to avoid extremely large payloads
 */
export const createApplication = async (req: Request, res: Response) => {
  try {
    const { jobId, jobTitle, company, appliedAt, mode, resume } = req.body;

    if (!appliedAt) {
      return res.status(400).json({ message: 'appliedAt (date) is required' });
    }

    if (mode === 'smart') {
      if (!resume || typeof resume !== 'string' || resume.trim().length === 0) {
        return res.status(400).json({ message: 'resume is required when mode is smart' });
      }
    }

    // Sanitize / limit resume size
    const safeResume = typeof resume === 'string' ? resume.slice(0, 20000) : resume;

    const appDoc = new Application({
      jobId,
      jobTitle,
      company,
      appliedAt: new Date(appliedAt),
      mode,
      resume: safeResume,
    });

    await appDoc.save();

    // Debugging helper: log the saved document id and a short preview of resume
    console.log('Application saved:', { id: appDoc._id, jobId: appDoc.jobId, resumePreview: (appDoc.resume || '').slice(0, 120) });

    // Return the saved document to the client for easier verification in dev
    return res.status(201).json({ message: 'Application saved', id: appDoc._id, application: appDoc });
  } catch (err) {
    console.error('createApplication error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * List applications (plain JSON). This endpoint is intentionally minimal.
 * Consider protecting it with auth in production.
 */
export const listApplications = async (req: Request, res: Response) => {
  try {
    const docs = await Application.find().sort({ createdAt: -1 }).limit(200).lean();
    return res.status(200).json(docs);
  } catch (err) {
    console.error('listApplications error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
