import { Schema, model } from 'mongoose';
import status from 'http-status';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles,
} from './academicSemester.constants';
import ApiError from '../../../errors/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const existingSemester = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (existingSemester) {
    throw new ApiError(status.CONFLICT, 'Academic Semester already exists!');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academic-semester',
  academicSemesterSchema
);
