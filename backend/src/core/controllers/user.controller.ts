import appAssert from "../../common/API/AppAssert";
import { emailSchema } from "../../common/schemas/auth";
import { mongoIdSchema, passwordChangeSchema } from "../../common/schemas/user";
import { BAD_REQUEST, OK } from "../../constants/http";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import {
  userAvatarService,
  userPasswordResetRequestService,
} from "../services/user.service";

export const userProfileImageHandler = asyncHandler(async (req, res) => {
  const userId = req.userId;
  appAssert(req.file, BAD_REQUEST, "avatar not found");
  const { path } = validateFileImage(req.file as Express.Multer.File);

  const { user } = await userAvatarService({
    avatar: path,
    userId: userId as string,
  });

  return res.status(OK).json({
    message: "Avatar successfully uploaded ",
    user,
  });
});

export const userResetPasswordHandler = asyncHandler(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await userPasswordResetRequestService({ email });

  return res.status(OK).json({
    message: "Password reset email sent successfully ",
  });
});

export const userPasswordChangeHandler = asyncHandler(async(req, res)=>{
  const body = passwordChangeSchema.parse({
    token: req.params.token,
  })
})