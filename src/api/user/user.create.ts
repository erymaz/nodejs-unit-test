import type { Response } from "express";
import type { ValidatedRequest } from "express-joi-validation";
import { User, UserInput } from "./user.model";
import { UserCreateRequestSchema } from './user.create.schema';

export default async(
  req: ValidatedRequest<UserCreateRequestSchema>,
  res: Response,
): Promise<Response> => {
  const { firstName, lastName, image, bio, category, personalities } = req.body;

  const userInput: UserInput = {
    firstName,
    lastName,
    image,
    bio,
    category,
    personalities,
  };

  try {
    const user = await User.create(userInput);
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log('Create user', err);
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
}
