import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import catchAysnc from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IGenericResponse } from '../../../interfaces/IGenericResponse';
import { academicSemesterFilterableFields } from './academicSemester.constants';

const createSemester = catchAysnc(
  async (request: Request, response: Response, next: NextFunction) => {
    const { ...semesterData } = request.body;
    const result = await AcademicSemesterServices.createSemester(semesterData);
    sendResponse<IAcademicSemester>(response, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully',
      data: result,
    });
    next();
  }
);

const getSemesters = catchAysnc(
  async (request: Request, response: Response, next: NextFunction) => {
    const paginationOptions = pick(request.query, paginationFields);
    const filters = pick(request.query, academicSemesterFilterableFields);
    const result = await AcademicSemesterServices.getSemesters(
      filters,
      paginationOptions
    );
    sendResponse<IGenericResponse<IAcademicSemester[]>>(response, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semesters retrieved successfully',
      data: result,
    });
    next();
  }
);

const getSingleSemester = catchAysnc(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const result = await AcademicSemesterServices.getSingleSemester(id);
    sendResponse<IAcademicSemester>(response, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester retrieved successfully',
      data: result,
    });
    next();
  }
);

const updateSemester = catchAysnc(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const updateOptions = request.body;
    const result = await AcademicSemesterServices.updateSemester(
      id,
      updateOptions
    );
    sendResponse<IAcademicSemester>(response, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester updated successfully',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
};
