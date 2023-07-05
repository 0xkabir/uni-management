import { Model, Types } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | string;
};

export type AcademicDepartmentModel = Model<IAcademicDepartment>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
};
