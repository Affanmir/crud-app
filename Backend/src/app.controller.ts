import { Body, Controller, Get, Header, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): {name: string} {
    return {name: 'Max'};
  }

  
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadedfile(
    @UploadedFile() catImage: Express.Multer.File
  ) {
    console.log( 'cool');
  }

}
