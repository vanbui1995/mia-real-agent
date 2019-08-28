import mongoose from 'mongoose';
import { ROLES } from '../../../common/enums';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: false },
    password: { type: String, required: false },
    provider: [{ id: String, name: String, _id: false }],
    role: { type: String, default: ROLES.INDIVIDUAL },
    categories: { type: [String] },
    token: String, // for login
    profile: {
      // profile for individual customer
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      position: { type: String, trim: true }, // position in company
      dateOfBirth: { type: Date, required: false },
      // profile for business customer
      companySize: { type: String, trim: true }, // need to discuss
      companyFields: [{ type: String, trim: true }], // company working fields
      // both
      company: { type: String, trim: true },
      phone: { type: String, trim: true },
      address: { type: String, required: false },
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    // indicate number of solved ticket for agent
    solved: {
      type: Number,
      required: true,
      default: 0,
    },
    // indicate number of unsolved ticket for agent
    unsolved: {
      type: Number,
      required: true,
      default: 0,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    application: { type: Schema.Types.ObjectId, ref: 'Application' },
  },
  {
    versionKey: false,
    collection: 'user',
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);
