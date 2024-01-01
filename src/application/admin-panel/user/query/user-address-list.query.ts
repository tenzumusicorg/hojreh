import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';
import {
  UserAddressItemDto,
  UserAddressListDto,
} from '../dto/user-address-list.dto';

export class UserAddressListQuery {
  constructor(public user_id: string) {}
}

@QueryHandler(UserAddressListQuery)
export class UserAddressListHandler
  implements IQueryHandler<UserAddressListQuery>
{
  constructor(
    @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
  ) {}

  async execute(query: UserAddressListQuery) {
    let foundAddressList = await this.userAddressRepository.findByUser(
      query.user_id,
    );
    let res = new UserAddressListDto();
    res.items = foundAddressList.map((element) => {
      return {
        id: element.id,
        title: element.title,
        postal_address: element.postal_address,
        postal_code: element.postal_code,
        no: element.no,
        floor: element.floor,
        lat: element.lat,
        lon: element.lon,
      } as UserAddressItemDto;
    });

    return res;
  }
}
