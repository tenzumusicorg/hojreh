export class CreateExcelDto {
  file_name: string;
  columns: ExcelColumnItemConfigDto[];
  data: ExcelData[]
}

export class ExcelColumnItemConfigDto {
  header: string;
  key: string;
  width: number;
}

export class ExcelData {}
