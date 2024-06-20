import { Schema, model } from "mongoose";

export interface IBrand {
  name: string;
  logo: string;
  startGuide: string;
}

const brandSchema = new Schema<IBrand>({
  name: { type: String, required: true, lowercase: true, trim: true },
  logo: { type: String, required: true },
  startGuide: { type: String, required: true },
});

export const Brand = model<IBrand>("brands", brandSchema);
