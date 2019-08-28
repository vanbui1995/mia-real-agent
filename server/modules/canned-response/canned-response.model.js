import mongoose from 'mongoose';

const { Schema } = mongoose;

const CannedRespondeSchema = new Schema(
  {
    shortcut: {
      type: String,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    collection: 'canned-responses',
    timestamps: true,
  },
);

export default mongoose.model('canned-responses', CannedRespondeSchema);
