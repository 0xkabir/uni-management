import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  password: string;
  role: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty
  // admin?: Types.ObjectId | IAdmin
};

export type UserModel = Model<IUser, object>; //to create further statics
