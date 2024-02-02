import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { throwHttpException } from 'src/utils/app/http-exception';
import { SuccessResponse } from './types';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private readonly logger = new Logger('S3');
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('aws.region'),
      credentials: {
        accessKeyId: this.configService.get('aws.access_key_id'),
        secretAccessKey: this.configService.get('aws.secret_access_key'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const bucket = this.configService.get('aws.bucket_name');
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${file.originalname.replaceAll(
      `.${fileExtension}`,
      '',
    )}-${Date.now()}.${fileExtension}`;

    try {
      const upload = new Upload({
        client: this.s3,
        params: {
          Bucket: bucket,
          Key: fileName,
          Body: file.buffer,
        },
      });
      const response =
        (await upload.done()) as CompleteMultipartUploadCommandOutput;
      return {
        url: response.Location,
        filename: fileName,
        mimetype: file.mimetype,
      } as SuccessResponse;
    } catch (error) {
      this.logger.error(error.message);
      throwHttpException(
        'Error uploading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
