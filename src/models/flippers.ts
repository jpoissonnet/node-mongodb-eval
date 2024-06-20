import { IBrand } from "./brands";
import { model, Schema } from "mongoose";

interface IFlipper {
  price: number;
  brands: IBrand;
  isSecondHand: boolean;
  name: string;
  releaseDate: Date;
  rating: number;
  images: string[];
  video: string;
  description: string;
}

const flipperSchema = new Schema<IFlipper>({
  price: { type: Number, required: true },
  brands: { type: Schema.Types.ObjectId, ref: "brands" },
  isSecondHand: { type: Boolean, required: true },
  name: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now, required: true },
  rating: { type: Number, required: true },
  images: [{ type: String, required: true }],
  video: { type: String, required: true },
  description: { type: String, required: true },
});

export const Flipper = model<IFlipper>("flippers", flipperSchema);
