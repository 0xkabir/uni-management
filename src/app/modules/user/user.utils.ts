import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const user = await User.findOne({ role: 'student' }, { id: true, _id: false })
    .sort({ createdAt: -1 })
    .lean();
  return user?.id ? user.id.substring(4) : undefined;
};

const findLastFacultyId = async () => {
  const user = await User.findOne({ role: 'faculty' }, { id: true, _id: false })
    .sort({ createdAt: -1 })
    .lean();
  return user?.id ? user.id.substring(2) : undefined;
};

export const generateStudentId = async (
  semester: IAcademicSemester | null
): Promise<string | undefined> => {
  const lastId = await findLastStudentId();
  const currentId = lastId ? lastId : (0).toString().padStart(5, '0');
  const incrementedId = parseInt(currentId) + 1;
  const studentId = `${semester?.year.substring(2)}${
    semester?.code
  }${incrementedId.toString().padStart(5, '0')}`;
  console.log(studentId);
  return studentId;
};

export const generateFacultyId = async (): Promise<string | undefined> => {
  const lastId = await findLastFacultyId();
  const currentId = lastId ? lastId : (0).toString().padStart(5, '0');
  const incrementedId = parseInt(currentId) + 1;
  const facultyId = `F-${incrementedId.toString().padStart(5, '0')}`;
  return facultyId;
};
