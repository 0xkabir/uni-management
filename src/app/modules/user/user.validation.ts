import { z } from 'zod';
import { bloodGroups, genders } from '../student/student.constants';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      gender: z.enum([...genders] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string().optional(),
      email: z.string({ required_error: 'email address is required' }).email(),
      contactNo: z.string({ required_error: 'contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),
      bloodGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
      guardian: z.object(
        {
          fatherName: z.string({ required_error: 'father name is required' }),
          fatherOccupation: z.string({
            required_error: 'father occupation is required',
          }),
          fatherContactNo: z.string({
            required_error: 'father contact number is required',
          }),
          motherName: z.string({ required_error: 'mother name is required' }),
          motherOccupation: z.string({
            required_error: 'mother occupation is required',
          }),
          motherContactNo: z.string({
            required_error: 'mother contact number is required',
          }),
          address: z.string({ required_error: 'guardian address is required' }),
        },
        { required_error: 'guardian informantion is required' }
      ),
      localGuardian: z.object(
        {
          name: z.string({ required_error: 'local guardian name is required' }),
          occupation: z.string({
            required_error: 'local guardian occupation is required',
          }),
          contactNo: z.string({
            required_error: 'local guardian contact number is required',
          }),
          address: z.string({
            required_error: 'local guardian address is required',
          }),
        },
        { required_error: 'local guardian information is required' }
      ),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
};
