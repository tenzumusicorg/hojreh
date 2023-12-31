import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import { Inject } from '@nestjs/common';
import { ExcelService } from 'src/infrastructure/file/execl.service';
import FileService from 'src/infrastructure/file/file.service';

export class UserExcelQuery {
  constructor() {}
}

@QueryHandler(UserExcelQuery)
export class UserExcelHandler implements IQueryHandler<UserExcelQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private excelService: ExcelService,
    private fileService: FileService,
  ) {}

  async execute(query: UserExcelQuery) {
    let foundUsersList = await this.userRepository.find();
    let columns = [
      { header: 'User Id', key: '_id', width: 25 },
      { header: 'First Name', key: 'first_name', width: 15 },
      { header: 'Last Name', key: 'last_name', width: 15 },
      { header: 'Phone number', key: 'phone_number', width: 15 },
      { header: 'email', key: 'email', width: 25 },
      { header: 'Status', key: 'status', width: 10 },
    ];
    let fileName: string = 'users.xlsx';
    let excelBuffer = await this.excelService.createExcel({
      data: foundUsersList,
      columns,
      file_name: 'users',
    });

    // let uploadedFile = await this.fileService.uploadFile(
    //   excelBuffer!,
    //   fileName,
    //   WEBSITE_BUCKET,
    //   'public-read',
    //   'xlsx',
    // );
    // let link = await this.fileService.getUrl(fileName, WEBSITE_BUCKET);
    // return {
    //   download_url: link,
    // };
  }
}
