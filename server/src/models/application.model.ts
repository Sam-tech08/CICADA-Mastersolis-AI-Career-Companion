import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  jobId?: string;
  jobTitle?: string;
  company?: string;
  appliedAt: Date;
  mode?: string;
  resume?: string;
}

const ApplicationSchema: Schema = new Schema<IApplication>({
  jobId: { type: String },
  jobTitle: { type: String },
  company: { type: String },
  appliedAt: { type: Date, required: true, default: Date.now },
  mode: { type: String, enum: ['manual', 'smart'], default: 'manual' },
  resume: { type: String },
}, { collection: 'application', timestamps: true });

const Application = mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
