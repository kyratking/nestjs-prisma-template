import { HttpStatus, Injectable } from '@nestjs/common';
import { Media } from '@prisma/client';
import { throwHttpException } from 'src/utils/app/http-exception';
import { RelationalDTO } from '../../shared-dtos';
import { S3Service } from '../aws/s3.service';
import { PrismaService } from '../prisma/prisma.service';
import { MediaType } from './types';

@Injectable()
export class MediaService {
  constructor(
    private s3Service: S3Service,
    private prismaService: PrismaService,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const { filename, url, mimetype } = await this.s3Service.uploadFile(file);
    return await this.createAndSave(MediaType.IMAGE, url, filename, mimetype);
  }

  async uploadVideo(file: Express.Multer.File) {
    return 'The API is not implemented yet.';
    const { filename, url, mimetype } = await this.s3Service.uploadFile(file);
    return await this.createAndSave(MediaType.VIDEO, url, filename, mimetype);
  }

  async uploadAudio(file: Express.Multer.File) {
    return 'The API is not implemented yet.';
    const { filename, url, mimetype } = await this.s3Service.uploadFile(file);
    return await this.createAndSave(MediaType.AUDIO, url, filename, mimetype);
  }

  createAndSave(
    type: MediaType,
    url: string,
    file_name: string,
    mime_type: string,
  ) {
    return this.prismaService.media.create({
      data: { type, url, file_name, mime_type },
    });
  }

  getById(id: number) {
    return this.prismaService.media.findUnique({ where: { id } });
  }

  getByIdAndType(id: number, type: MediaType) {
    return this.prismaService.media.findUnique({ where: { id, type } });
  }

  async shouldExist(id: number, error?: string) {
    const media = await this.getById(id);
    if (!media)
      throwHttpException(error || 'Media not found', HttpStatus.NOT_FOUND);
    return media;
  }

  async shouldExistPromise(id: number, error?: string) {
    return new Promise<Media>(async (resolve, reject) => {
      const media = await this.getById(id);
      if (!media) reject([error || 'Media not found', HttpStatus.NOT_FOUND]);
      resolve(media);
    });
  }

  async shouldExistArrayPromise(
    media: Media[] | RelationalDTO[],
    error?: string,
  ) {
    return new Promise<Media[]>(async (resolve, reject) => {
      const promises = media.map((m: Media) =>
        this.shouldExistPromise(m.id, error),
      );
      try {
        const resolved = await Promise.all(promises);
        resolve(resolved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async shouldExistWithTypePromise(
    id: number,
    type: MediaType,
    error?: string,
  ) {
    return new Promise<Media>(async (resolve, reject) => {
      const media = await this.getByIdAndType(id, type);
      if (!media) reject([error || 'Media not found', HttpStatus.NOT_FOUND]);
      resolve(media);
    });
  }

  async shouldExistWithTypeArrayPromise(
    media: Media[] | RelationalDTO[],
    type: MediaType,
    error?: string,
  ) {
    return new Promise<Media[]>(async (resolve, reject) => {
      const promises = media.map((m) =>
        this.shouldExistWithTypePromise(m.id, type, error),
      );
      try {
        const resolved = await Promise.all(promises);
        resolve(resolved);
      } catch (error) {
        reject(error);
      }
    });
  }
}
