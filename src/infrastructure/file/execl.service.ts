import { Injectable } from '@nestjs/common';
import excelJS from 'exceljs';
import { CreateExcelDto } from './dto/create-excel.dto';

@Injectable()
export class ExcelService {
  constructor() {}

  async createExcel(createDto: CreateExcelDto): Promise<Buffer> {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet(createDto.file_name);

    let workSheetColumns = [{ header: 'No', key: 'no', width: 5 }];
    workSheetColumns.push(...createDto.columns);
    worksheet.columns = workSheetColumns;

    let counter = 0;
    let res = createDto.data.map((data) => {
      counter = counter + 1;
      return { ...data, no: counter };
    });

    res.forEach((data) => {
      worksheet.addRow(data);
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    let excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer as Buffer;
  }

  async importExcelData(
    excelBuffer: Buffer,
    columns: string[],
  ): Promise<any[]> {
    const workbook: excelJS.Workbook = new excelJS.Workbook();
    await workbook.xlsx.load(excelBuffer);
    const worksheet: excelJS.Worksheet = workbook.worksheets[0];

    const headerRow: any[] = worksheet.getRow(1).values as any[];

    const data: any[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData: any = {};

        row.eachCell((cell, colNumber) => {
          const header: string = headerRow[colNumber];
          const value: any = cell.value;

          // Check if the column is needed
          if (columns.includes(header)) {
            rowData[header] = value;
          }
        });
        //  console.log(2,rowData);

        data.push(rowData);
      }
    });
    console.log(3);

    return data;
  }
}
