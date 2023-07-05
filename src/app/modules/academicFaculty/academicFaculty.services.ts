import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/IGenericResponse';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getFaculties = async (
  filterOptions: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filters } = filterOptions;
  const { page, limit, skip, sortOptions } =
    PaginationHelper.calculatePagination(paginationOptions);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultyFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const total = await AcademicFaculty.countDocuments();
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  updateOptions: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    updateOptions,
    { new: true }
  );
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicFacultyServices = {
  createFaculty,
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
