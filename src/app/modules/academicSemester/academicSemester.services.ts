import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodeMapper,
  academicSemesterSearchableFields,
} from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/IGenericResponse';
import { PaginationHelper } from '../../../helpers/paginationHelper';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester Code does not match');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortOptions } =
    PaginationHelper.calculatePagination(paginationOptions);

  const { searchTerm, ...filterFields } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterFields).length) {
    andConditions.push({
      $and: Object.entries(filterFields).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const total = await AcademicSemester.countDocuments();
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  updateOptions: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    updateOptions.title &&
    updateOptions.code &&
    academicSemesterCodeMapper[updateOptions.title] !== updateOptions.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester Code does not match');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updateOptions,
    { new: true }
  );
  return result;
};

export const AcademicSemesterServices = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
};
