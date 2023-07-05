import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../../middlewares/validateRequest';

const router = Router();
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/', AcademicFacultyController.getFaculties);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch('/:id', AcademicFacultyController.updateFaculty);
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
