import { Router } from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/all-semesters', AcademicSemesterController.getSemesters);
router.get('/all-semesters/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/all-semesters/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

export const AcademicSemesterRoutes = router;
