import mongoose from "mongoose";

const timelineEventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["call", "whatsapp", "email", "note", "status", "system"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
  },
});

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },

  interest: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "in-progress", "converted", "rejected"],
    default: "new",
  },
  premium: {
    type: Number,
  },
  notes: {
    type: String,
    default: "",
  },
  assignedAdvisor: {
    type: String,
    default: "",
  },
  followUpDate: {
    type: String,
    default: "",
  },
  source: {
    type: String,
    default: "web",
  },
  timeline: {
    type: [timelineEventSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for ID mapping to fit the client model if needed
leadSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

leadSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  },
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;
