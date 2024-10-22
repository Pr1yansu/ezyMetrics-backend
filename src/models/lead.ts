import mongoose, { Document, Schema } from "mongoose";

export interface ILead extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const LeadSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, lowercase: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email!`,
    },
  },
  phone: { type: String, required: true, unique: true },
});

export const Lead = mongoose.model<ILead>("Lead", LeadSchema);
