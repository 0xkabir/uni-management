import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  let userAllData = null;
  // setting the password and role
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  user.role = 'student';

  // generating the id
  const semester = await AcademicSemester.findById(student.academicSemester);

  // implementing transaction and rollback
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = (await generateStudentId(semester)) as string;
    student.id = id;
    user.id = id;
    // creating an new student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create student');
    }
    // creating a new user
    user.student = newStudent[0]._id; //setting the student id for referencing
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    userAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return userAllData;
};

export const UserServices = {
  createStudent,
};
