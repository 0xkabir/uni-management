import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.services';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { paginationFields } from '../../../constants/pagination';

const createFaculty = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { ...facultyData } = request.body;
    const data = await AcademicFacultyServices.createFaculty(facultyData);

    sendResponse<IAcademicFaculty>(response, {
      statusCode: 200,
      success: true,
      message: 'faculty created successfully',
      data: data,
    });
    next();
  }
);

const getFaculties = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const filters = pick(request.query, academicFacultyFilterableFields);
    const paginationOptions = pick(request.query, paginationFields);
    const data = await AcademicFacultyServices.getFaculties(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicFaculty[]>(response, {
      statusCode: 200,
      success: true,
      message: 'faculties retrieved',
      meta: data.meta,
      data: data.data,
    });
    next();
  }
);

const getSingleFaculty = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const data = await AcademicFacultyServices.getSingleFaculty(id);
    sendResponse<IAcademicFaculty>(response, {
      statusCode: 200,
      success: true,
      message: 'faculty retrieved',
      data: data,
    });

    next();
  }
);

const updateFaculty = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const updateOptions = request.body;
    const data = await AcademicFacultyServices.updateFaculty(id, updateOptions);
    sendResponse<IAcademicFaculty>(response, {
      statusCode: 200,
      success: true,
      message: 'faculty updated',
      data: data,
    });

    next();
  }
);

const deleteFaculty = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const data = await AcademicFacultyServices.deleteFaculty(id);
    sendResponse<IAcademicFaculty>(response, {
      statusCode: 200,
      success: true,
      message: 'faculty deleted',
      data: data,
    });
    next();
  }
);

export const AcademicFacultyController = {
  createFaculty,
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
