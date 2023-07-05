import { Model, Types } from 'mongoose';

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
  academicSemester: Types.ObjectId | string;
  academicDepartment: Types.ObjectId | string;
  academicFaculty: Types.ObjectId | string;
  profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

// Record<string, unknown> works as a replacement of object
