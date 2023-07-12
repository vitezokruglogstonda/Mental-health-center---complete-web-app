import { Test, TestingModule } from '@nestjs/testing';
import { OperatorController } from './operator.controller';

describe('OperatorController', () => {
  let controller: OperatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorController],
    }).compile();

    controller = module.get<OperatorController>(OperatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
