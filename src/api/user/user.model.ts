import mongoose, { Schema, Model, Document } from 'mongoose';
import { CategoryType, IPersonalities } from '../../shared/types';

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  image: string;
  bio: string;
  category: CategoryType;
  personalities: IPersonalities;
};

export type UserInput = {
  firstName: UserDocument['firstName'];
  lastName: UserDocument['lastName'];
  image: UserDocument['image'];
  bio: UserDocument['bio'];
  category: UserDocument['category'];
  personalities?: UserDocument['personalities'];
};

const userSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      required: true,
    },
    bio: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.String,
      required: true,
    },
    personalities: {
      type: Schema.Types.Map,
      required: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
