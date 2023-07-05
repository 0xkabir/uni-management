import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessages } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid Id',
    errorMessages: errors,
  };
};

export default handleCastError;
