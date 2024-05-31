export interface IAwsS3PutItemOptions {
  path?: string;
  customFileName?: string;
  //   acl: ObjectCannedACL;
}

export interface IAwsS3RandomFileName {
  path: string;
  customFileName: string;
}

export interface IAwsS3PutItem {
  buffer: string | Uint8Array | Buffer;
  originalName: string;
  size: number;
}
