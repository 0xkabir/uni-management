import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';
import catchAysnc from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent = catchAysnc(
  async (request: Request, response: Response, next: NextFunction) => {
    const { student, ...userData } = request.body;
    const result = await UserServices.createStudent(student, userData);
    sendResponse<IUser>(response, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createStudent,
};
