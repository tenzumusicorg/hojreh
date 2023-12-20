import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginateOptions } from 'mongoose';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';
import { AdminItemDto, AdminListDto } from '../dto/admin-list.dto';
import { AdminStatusEnum } from 'src/domain/admin/constant/admin-status.enum';

export class AdminListQuery {
  constructor(
    public page: number,
    public limit: number,
    public query: string,
    public filter_status: AdminStatusEnum,
  ) {}
}

@QueryHandler(AdminListQuery)
export class AdminListHandler implements IQueryHandler<AdminListQuery> {
  constructor(
    @Inject(IAdminRepository)
    private readonly adminsRepository: IAdminRepository,
  ) {}

  async execute(query: AdminListQuery) {
    const options: PaginateOptions = {
      select: [
        'id',
        'first_name',
        'last_name',
        'register_date',
        'status',
        'role',
      ],
      page: query.page,
      limit: query.limit,
    };
    let adminQuery = this.adminsRepository.model().find();
    adminQuery.where({
      is_deleted: false,
    });

    if (query.query) {
      adminQuery.where({
        $or: [
          { first_name: new RegExp(query.query, 'i') },
          { last_name: new RegExp(query.query, 'i') },
        ],
      });
    }
    if (query.filter_status) adminQuery.where({ status: query.filter_status });

    let foundAdminList = await this.adminsRepository
      .model()
      .paginate(adminQuery, options);

    let res = new AdminListDto();
    res.page = foundAdminList.page || query.page;
    res.total_pages = foundAdminList.totalPages;
    res.items = foundAdminList.docs.map((element) => {
      return {
        id: element._id.toString(),
        email: element.email,
        first_name: element.first_name,
        last_name: element.last_name,
        register_date: element.register_date,
        status: element.status,
        role: element.role,
      } as AdminItemDto;
    });
    return res;
  }
}
