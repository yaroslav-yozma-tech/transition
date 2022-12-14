import { Module } from '@nestjs/common';
import { TransitionController } from './transition.controller';
import { TransitionService } from './transition.service';
import { TransitionRepository } from './transition.repository';

@Module({
  imports: [],
  controllers: [TransitionController],
  providers: [TransitionService, TransitionRepository],
})
export class TransitionModule {}
