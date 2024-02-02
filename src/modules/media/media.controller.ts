import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediaService } from './media.service';
import { MediaSizes } from './types';

@ApiTags('Uploads')
@Controller('uploads')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @ApiOperation({ summary: 'Upload an image. Max file size is 5MB.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The image has been successfully uploaded.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The file is not an image.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The image format is not accepted.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The image size is too big.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: MediaSizes.IMAGE,
            message: 'File size is too big. Max size is 5MB.',
          }),
        ],
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.mediaService.uploadImage(file);
  }

  @ApiOperation({ summary: 'Upload an audio. Max file size is 10MB.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The audio has been successfully uploaded.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The file is not an audio.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The audio format is not supported.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The audio size is too big.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(mp3|wav|mpeg)' }),
          new MaxFileSizeValidator({
            maxSize: MediaSizes.IMAGE,
            message: 'File size is too big. Max size is 10MB.',
          }),
        ],
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.mediaService.uploadAudio(file);
  }

  @ApiOperation({ summary: 'Upload a video. Max file size is 50MB.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The video has been successfully uploaded.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The file is not a video.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The video format is not supported.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The video size is too big.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(mp4)' }),
          new MaxFileSizeValidator({
            maxSize: MediaSizes.IMAGE,
            message: 'File size is too big. Max size is 50MB.',
          }),
        ],
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.mediaService.uploadVideo(file);
  }
}
