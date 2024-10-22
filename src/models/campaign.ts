import mongoose, { Document, Schema } from "mongoose";

export interface ICampaign extends Document {
  id: string;
  name: string;
  status: string;
  lead: string;
}

const CampaignSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, lowercase: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "paused", "completed"],
  },
  lead: { type: Schema.Types.ObjectId, ref: "Lead" },
});

export const Campaign = mongoose.model<ICampaign>("Campaign", CampaignSchema);
