import { Router } from 'express';
import { UserRoutes } from '../app/modules/user/user.routes';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartments/academicDepartment.routes';

const router = Router();

const routes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/departments',
    route: AcademicDepartmentRoutes,
  },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export const ModuleRoutes = router;
