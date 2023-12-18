import { EmailRequestInterface } from 'src/infrastructure/mail/email-request.interface';

export const adminSignupEmailValues: EmailRequestInterface = {
  subject: 'حساب کاربری جدید',
  upText: 'عزیز',
  bottomText: 'حساب کاربری شما در تنزوشاپ با موفقیت ساخته شد',
  linkText: 'ورود به حساب کاربری',
};
