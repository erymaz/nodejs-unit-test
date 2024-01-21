import mongoose, { Schema, Model, Document } from 'mongoose';
import type { EnneagramType, MbtiType, ZodiacType } from '../../shared/types';

export type CommentDocument = Document & {
  author: string;
  proposer: string;
  mbti?: MbtiType;
  enneagram?: EnneagramType;
  zodiac?: ZodiacType;
  title: string;
  content: string;
  likes: string[];
};

export type CommentInput = {
  author: CommentDocument['author'];
  proposer: CommentDocument['proposer'];
  mbti?: CommentDocument['mbti'];
  enneagram?: CommentDocument['enneagram'];
  zodiac?: CommentDocument['zodiac'];
  title: CommentDocument['title'];
  content: CommentDocument['content'];
};

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.String,
      required: true,
    },
    proposer: {
      type: Schema.Types.String,
      required: true,
    },
    mbti: {
      type: Schema.Types.String,
      require: false,
    },
    enneagram: {
      type: Schema.Types.String,
      require: false,
    },
    zodiac: {
      type: Schema.Types.String,
      require: false,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    likes: {
      type: Schema.Types.Array,
      required: false,
      default: [],
    },
  },
  {
    collection: 'comments',
    timestamps: true,
  },
);

export const Comment: Model<CommentDocument> = mongoose.model<CommentDocument>('Comment', commentSchema);
