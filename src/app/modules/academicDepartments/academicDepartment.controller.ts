import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.services';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { paginationFields } from '../../../constants/pagination';

const createDepartment = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { ...departmentData } = request.body;
    const data = await AcademicDepartmentServices.createDepartment(
      departmentData
    );

    sendResponse<IAcademicDepartment>(response, {
      statusCode: 200,
      success: true,
      message: 'Department created successfully',
      data: data,
    });
    next();
  }
);

const getDepartments = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const filters = pick(request.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(request.query, paginationFields);
    const data = await AcademicDepartmentServices.getDepartments(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicDepartment[]>(response, {
      statusCode: 200,
      success: true,
      message: 'Departments retrieved',
      meta: data.meta,
      data: data.data,
    });
    next();
  }
);

const getSingleDepartment = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const data = await AcademicDepartmentServices.getSingleDepartment(id);
    sendResponse<IAcademicDepartment>(response, {
      statusCode: 200,
      success: true,
      message: 'Department retrieved',
      data: data,
    });

    next();
  }
);

const updateDepartment = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const updateOptions = request.body;
    const data = await AcademicDepartmentServices.updateDepartment(
      id,
      updateOptions
    );
    sendResponse<IAcademicDepartment>(response, {
      statusCode: 200,
      success: true,
      message: 'Department updated',
      data: data,
    });

    next();
  }
);

const deleteDepartment = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const data = await AcademicDepartmentServices.deleteDepartment(id);
    sendResponse<IAcademicDepartment>(response, {
      statusCode: 200,
      success: true,
      message: 'Department deleted',
      data: data,
    });
    next();
  }
);

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
