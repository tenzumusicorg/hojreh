export interface IS3Service {
  createBucket(string: string):Promise<any>;
  deleteBucket(string: string): Promise<void>;
  checkBucket(string: string): Promise<boolean>;
  getBucketList(): Promise<any[]|undefined>;
  createObject(
    key: string,
    file: Buffer,
    bucket: string,
    acl: string,
    contentType: string
  ): Promise<void>;
  getObject(key: string, bucket: string): Promise<any>;
  getObjectAcl(key: string, bucket: string): Promise<any>;
  updateObjectAcl(key: string, bucket: string, acl: string): Promise<any>;
  deleteObject(key: string, bucket: string): Promise<any>;
  getBucketObjectList(bucket: string): Promise<any>;
}

export const IS3Service = Symbol('IS3Service');
