import { ExceptionMessage } from './exception-message.interface';

export const NotFoundExceptionMessage: ExceptionMessage = {
  message: {
    en: 'Your request has not been found',
    fa: 'درخواست شما یافت نشد',
  },
};

export const BadRequestExceptionMessage: ExceptionMessage = {
  message: {
    en: 'There is an error in your submitted data',
    fa: 'در ورود اطلاعات مشکلی رخ داده است',
  },
};

export const AllExceptionMessage: ExceptionMessage = {
  message: {
    en: 'There is an unknown error',
    fa: 'مشکلی رخ داده است',
  },
};

export const ForbiddenResourceExceptionMessage: ExceptionMessage = {
  message: {
    en: "You don't have the required permissions.",
    fa: 'شما به این بخش دسترسی ندارید',
  },
};

export const UnauthorizedExceptionMessage: ExceptionMessage = {
  message: {
    en: 'کاربر پیدا نشد',
    fa: 'User not found',
  },
};

export const UnCompleteSignupExeptionMessage: ExceptionMessage = {
  message: {
    en: 'user should go to signup',
    fa: 'ثبت نام کاربر ناقص است',
  },
};

export const IncorrectRefreshTokenMessage: ExceptionMessage = {
  message: {
    en: 'Incorrect refresh token',
    fa: 'توکن معتبر نیست',
  },
};

export const IncorrectRefreshTokenCredentialsMessage: ExceptionMessage = {
  message: {
    en: 'Authentication credentials were missing or incorrect',
    fa: 'توکن معتبر نیست',
  },
};

export const EmailAlreadyExistsExceptionMessage: ExceptionMessage = {
  message: {
    en: 'this email is submit already for other user',
    fa: 'این ایمیل برای کاربر دیگری ثبت شده است.',
  },
};

export const PhoneAlreadyExistsExceptionMessage: ExceptionMessage = {
  message: {
    en: 'this phone number is submit already for other user',
    fa: 'این شماره برای کاربر دیگری ثبت شده است.',
  },
};

export const EmailVerificationTokenExpiredExceptionMessage: ExceptionMessage = {
  message: {
    en: 'your email verification token is expired please try resend the code',
    fa: 'درخواست تایید ایمیل شما منقضی شده است.',
  },
};
