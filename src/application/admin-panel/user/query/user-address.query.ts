import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';
import { UserAddressItemDto } from '../dto/user-address-list.dto';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UserAddressQuery {
  constructor(public id: string) {}
}

@QueryHandler(UserAddressQuery)
export class UserAddressHandler implements IQueryHandler<UserAddressQuery> {
  constructor(
    @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
  ) {}

  async execute(query: UserAddressQuery) {
    let foundAddress = await this.userAddressRepository.findOne(query.id);
    if (!foundAddress) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new UserAddressItemDto();
    res = {
      id: foundAddress.id,
      title: foundAddress.title,
      postal_address: foundAddress.postal_address,
      postal_code: foundAddress.postal_code,
      no: foundAddress.no,
      floor: foundAddress.floor,
      lat: foundAddress.lat,
      lon: foundAddress.lon,
    };

    return res;
  }
}
