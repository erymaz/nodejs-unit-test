import type { Response } from 'express';
import type { ValidatedRequest } from "express-joi-validation";
import { User } from './user.model';
import { UserGetRequestSchema } from './user.get.schema';

export default async function (
  req: ValidatedRequest<UserGetRequestSchema>,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Can\'t find user with ID: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log('Get user', err);
    return res.status(500).json({
      success: false,
      message: `Something went wrong.`,
    });
  }
};
