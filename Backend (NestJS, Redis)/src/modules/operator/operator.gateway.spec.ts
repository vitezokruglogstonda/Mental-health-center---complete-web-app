import { Test, TestingModule } from '@nestjs/testing';
import { OperatorGateway } from './operator.gateway';

describe('OperatorGateway', () => {
  let gateway: OperatorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperatorGateway],
    }).compile();

    gateway = module.get<OperatorGateway>(OperatorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
