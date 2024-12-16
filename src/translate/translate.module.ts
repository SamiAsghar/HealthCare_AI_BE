import { Module } from '@nestjs/common';

import { TranslateService } from './translate.service';
import { TranslateController } from './translate.controller';

@Module({
  imports: [],
  controllers: [TranslateController],
  providers: [TranslateService],
})
export class TranslateModule {}
