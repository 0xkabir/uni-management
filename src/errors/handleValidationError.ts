import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(error.errors).map(
    (errorElem: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: errorElem?.path,
        message: errorElem?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
