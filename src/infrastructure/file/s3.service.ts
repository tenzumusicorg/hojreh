import { Injectable } from '@nestjs/common';
import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  HeadBucketCommand,
  ListBucketsCommand,
  GetObjectCommand,
  GetObjectAclCommand,
  PutObjectAclCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { IS3Service } from './interface/s3-service.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigValues } from '../config/app.configuration';

@Injectable()
export default class S3Service implements IS3Service {
  client: S3Client;

  constructor(configService: ConfigService) {
    this.client = new S3Client({
      region: configService.get<string>(ConfigValues.S3_region) || 'us-east-1',
      endpoint: configService.get<string>(ConfigValues.S3_ENDPOINT),
      credentials: {
        accessKeyId: configService.get<string>(ConfigValues.S3_ACCESS_KEY_ID)!,
        secretAccessKey: configService.get<string>(
          ConfigValues.S3_SECRET_ACCESS_KEY,
        )!,
      },
    });
  }

  async createBucket(bucket: string) {
    try {
      let res = await this.client.send(
        new CreateBucketCommand({
          Bucket: bucket,
          ACL: 'public-read', // 'private' | 'public-read'
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async deleteBucket(bucket: string) {
    try {
      await this.client.send(
        new DeleteBucketCommand({
          Bucket: bucket,
        }),
      );
    } catch (err) {
      throw err;
    }
  }

  async checkBucket(bucket: string) {
    try {
      let res = await this.client.send(
        new HeadBucketCommand({
          Bucket: bucket,
        }),
      );

      return true;
    } catch (err) {
      return false;
    }
  }

  async getBucketList() {
    try {
      const data = await this.client.send(new ListBucketsCommand({}));
      return !!data.Buckets ? data.Buckets : [];
    } catch (err) {
      throw err;
    }
  }

  async createObject(
    key: string,
    file: Buffer,
    bucket: string,
    acl: ObjectCannedACL,
    contentType: string,
  ): Promise<any> {
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: file,
      ACL: acl,
      ContentType: contentType,
    };
    try {
      return await this.client.send(new PutObjectCommand(uploadParams));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getObject(key: string, bucket: string) {
    try {
      const params = { Bucket: bucket, Key: key };

      return await this.client.send(new GetObjectCommand(params));
    } catch (err) {
      throw err;
    }
  }

  async getObjectAcl(key: string, bucket: string) {
    try {
      const params = { Bucket: bucket, Key: key };

      return await this.client.send(new GetObjectAclCommand(params));
    } catch (err) {
      throw err;
    }
  }

  async updateObjectAcl(key: string, bucket: string, acl: ObjectCannedACL) {
    try {
      const params = { Bucket: bucket, Key: key, ACL: acl };

      return await this.client.send(new PutObjectAclCommand(params));
    } catch (err) {
      throw err;
    }
  }

  async deleteObject(key: string, bucket: string): Promise<void> {
    try {
      const params = { Bucket: bucket, Key: key };

      await this.client.send(new DeleteObjectCommand(params));
    } catch (err) {
      console.log('Error', err);
      throw err;
    }
  }

  async getBucketObjectList(bucket: string) {
    try {
      const response = await this.client.send(
        new ListObjectsCommand({
          Bucket: bucket,
        }),
      );
      return response;
    } catch (err) {
      console.log('Error', err);
      return [];
    }
  }
}
