import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import PolicyContentDto from '../dto/get-policy-content.dto';

export class PolicyContentQuery {
  constructor() {}
}

@QueryHandler(PolicyContentQuery)
export class BannerDetailHandler implements IQueryHandler<PolicyContentQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: PolicyContentQuery) {
    let policyContent = await this.staticRepository.getPolicyContent();
    let res = new PolicyContentDto();
    if (policyContent) {
      res.id = policyContent.id;
      res.content = policyContent.content;
    }
    return res;
  }
}
