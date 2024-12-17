import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { setTimeout } from 'timers/promises';
import {Multer} from 'multer';
  
  @Injectable()
  export class TranslateService {

  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }


    async transcribeAndTranslate(file: Multer.File , body: { target_language: string }) {
        if (!file) {
            throw new HttpException('No audio file provided', HttpStatus.BAD_REQUEST);
          }
          const tempFilePath = path.join('/tmp', file.originalname);
          await fs.promises.writeFile(tempFilePath, file.buffer);

          const targetLanguage = body.target_language || 'es';
          try {
            const transcription = await this.transcribeAudio(file, tempFilePath);
            const translation = await this.translateText(transcription, targetLanguage);
            return { transcription, translation };
          } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
          }
  
  
  }

  async textToSpeech(text: string) {
    const response = await this.openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    })
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  }


  private async transcribeAudio(file: Multer.File, tempFilePath:string): Promise<string> {
    try {
      let response;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await this.openai.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: "whisper-1",
          });
          break; // Exit loop if successful

        } catch (err) {
          if (attempt === 3) throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
          await setTimeout(1000); // Wait before retrying
        }
      }
      return response.text;
    } catch (error) {
      throw new BadRequestException('Error transcribing audio', error);
    } finally {
      fs.unlinkSync(tempFilePath);
    }
  }

  private async translateText(text: string, targetLanguage: string): Promise<string> {

    const prompt = `Translate the following text into ${targetLanguage}: ${text}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a translator that returns only the translations of text provided.' },
        { role: 'user', content: prompt },
      ],
    });

    return response.choices[0].message.content as string;
  }
  

}
  