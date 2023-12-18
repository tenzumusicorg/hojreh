import { BadRequestException, ValidationError } from '@nestjs/common';

function transform(errors: ValidationError[]) {
  let errorArray = new Array<string>();
  return getErrorFromMessage(errorArray, errors, '');
}
function getErrorFromMessage(
  responseArray: Array<string>,
  validationErrors: ValidationError[],
  parentPath: string,
) {
  validationErrors.forEach((err) => {
    if (!!err.children && err.children.length > 0) {
      parentPath = parentPath.concat('.', err.property);
      getErrorFromMessage(responseArray, err.children, parentPath);
    } else if (!!err.constraints) {
      let errors = Object.values(err.constraints);
      responseArray.push(
        ...errors.map((err) => {
          return `${parentPath}.${err}`;
        }),
      );
    }
  });
  return responseArray;
}
export default class ValidationExceptions extends BadRequestException {
  constructor(public validationErrors: ValidationError[]) {
    super({
      error: 'ValidationError',
      messages: transform(validationErrors).flat(),
    });
  }
}
