import { EmailRequestInterface } from "src/infrastructure/mail/email-request.interface";

export const userCreatedEmailValues: EmailRequestInterface = {
  subject: 'حساب کاربری جدید',
  upText: 'عزیز',
  bottomText: 'حساب کاربری شما در تنزوشاپ با موفقیت ساخته شد',
  linkText: 'ورود به حساب کاربری',
};

export const userEmailUpdatedEmailValues: EmailRequestInterface = {
  subject: 'بروز رسانی حساب کاربری',
  upText: 'عزیز',
  bottomText: 'ایمیل حساب کاربری شما در تنزوشاپ با موفقیت بروزرسانی شد',
  linkText: 'ورود به حساب کاربری',
};
