import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { AdminDto } from '../dto/admin.dto';

export class AdminProfileQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(AdminProfileQuery)
export class AdminProfileHandler implements IQueryHandler<AdminProfileQuery> {
  constructor(
    @Inject(IAdminRepository)
    private readonly adminsRepository: IAdminRepository,
  ) {}

  async execute(query: AdminProfileQuery): Promise<AdminDto> {
    const foundAdmin = await this.adminsRepository.findOne(query.id);

    if (!foundAdmin) throw new NotFoundException(NotFoundExceptionMessage);

    console.log(foundAdmin.id);

    let res = new AdminDto();
    res.id = foundAdmin.id;
    res.first_name = foundAdmin.first_name;
    res.last_name = foundAdmin.last_name;
    res.role = foundAdmin.role;
    res.register_date = foundAdmin.register_date;
    res.status = foundAdmin.status;
    res.email = foundAdmin.email;

    return res;
  }
}
