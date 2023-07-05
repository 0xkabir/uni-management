import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Department title is required' }),
    academicFaculty: z.string({ required_error: 'Faculty id is required' }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
