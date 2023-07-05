import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../interfaces/paginationOptions';

type IOptionsReturn = {
  page: number;
  limit: number;
  skip: number;
  sortOptions: {
    [key: string]: SortOrder;
  };
};

const calculatePagination = (options: IPaginationOptions): IOptionsReturn => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const skip = (page - 1) * limit;
  const sortOptions = { [sortBy]: sortOrder };
  return {
    page,
    limit,
    skip,
    sortOptions,
  };
};

export const PaginationHelper = {
  calculatePagination,
};
