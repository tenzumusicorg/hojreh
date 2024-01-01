import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import { Inject } from '@nestjs/common';
import { UserStatusEnum } from 'src/domain/user/schema/user.schema';
import { PaginateOptions } from 'mongoose';
import { UserItemDto, UserListDto } from '../dto/user-list.dto';

export class UserListQuery {
  constructor(
    public page: number,
    public limit: number,
    public query: string,
    public status: UserStatusEnum,
  ) {}
}

@QueryHandler(UserListQuery)
export class UserListHandler implements IQueryHandler<UserListQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: UserListQuery) {
    const options: PaginateOptions = {
      select: [
        'id',
        'first_name',
        'last_name',
        'register_date',
        'phone_number',
        'status',
        'avatar_image',
      ],
      page: query.page,
      limit: query.limit,
    };
    let userQuery = this.userRepository.model().find();
    if (!!query.query) {
      userQuery.where({
        $or: [
          { first_name: new RegExp(query.query, 'i') },
          { last_name: new RegExp(query.query, 'i') },
          { phone_number: new RegExp(query.query, 'i') },
        ],
      });
    }
    if (query.status.length != 0)
      userQuery.where({ status: { $in: query.status } });

    let foundUsersList = await this.userRepository
      .model()
      .paginate(userQuery, options);

    let res = new UserListDto();
    res.page = foundUsersList.page || query.page;
    res.total_pages = foundUsersList.totalPages;
    res.items = foundUsersList.docs.map((element) => {
      return {
        id: element._id.toString(),
        avatar_image: element.avatar_image,
        first_name: element.first_name,
        last_name: element.last_name,
        register_date: element.register_date,
        status: element.status,
        phone_number: element.phone_number,
      } as UserItemDto;
    });
    res.total_users = await this.userRepository.model().countDocuments({});
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    res.total_users_in_month = await this.userRepository
      .model()
      .countDocuments({
        createdAt: { $gte: lastMonth },
      });
    res.total_customers = await this.getTotalCustomers();

    return res;
  }

  private async getTotalCustomers(): Promise<number> {
    const count = await this.userRepository
      .model()
      .aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'user_id',
            as: 'orders',
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            orderCount: { $size: '$orders' },
          },
        },
        {
          $match: { orderCount: { $gte: 1 } },
        },
        {
          $group: { _id: null, customerCount: { $sum: 1 } },
        },
      ])
      .exec();

    return count.length > 0 ? count[0].customerCount : 0;
  }
}
