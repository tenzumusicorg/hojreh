export class EmailRequestDto {
  to: string;
  subject: string;
  upText: string;
  bottomText: string;
  code1?:string= ''
  code2?: string = ''
  linkText: string;
  linkUrl: string;
}
