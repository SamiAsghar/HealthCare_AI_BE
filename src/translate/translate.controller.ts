import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { Multer } from 'multer';
import { TranslateService } from './translate.service';

@Controller('/api/translate')
export class TranslateController {
  constructor(private translateService: TranslateService) {}

  @Get()
  getTranslate(@Res() res) {
    return res.json({ message: 'Hello World!' });
  }

  @Post('/transcribe-and-translate')
  @UseInterceptors(FileInterceptor('file'))
  async transcribeAndTranslate(
    @UploadedFile() file: Multer.File,
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: { target_language: string },
  ) {
    const response = await this.translateService.transcribeAndTranslate(
      file,
      body,
    );
    return res.json(response);
  }

  @Post('/text-to-speech')
  async speakTranslation(
    @Body() body: { text: string; target_language: string },
  ) {
    const response = await this.translateService.textToSpeech(
      body.text
    );
    return response;
  }
}
