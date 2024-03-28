import { HttpStatus } from '@nestjs/common';
import {
  ApiHeaderOptions,
  ApiParamOptions,
  ApiQueryOptions,
} from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constant';

export interface IAppDocOptions {
  summary?: string;
  operation?: string;
  deprecated?: boolean;
  description?: string;
  statusCode?: number;
  messagePath?: string;
  serialization?: ClassConstructor<any>;
  httpStatus?: HttpStatus;
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
  apiKey?: boolean;
  google?: boolean;
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  headers?: ApiHeaderOptions[];
  bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
}

// export interface IDocOfOptions {
//   statusCode: number;
//   messagePath: string;
//   serialization?: ClassConstructor<any>;
// }

// export interface IDocDefaultOptions extends IDocOfOptions {
//   httpStatus: HttpStatus;
// }

// export interface IDocAuthOptions {
//   jwtAccessToken?: boolean;
//   jwtRefreshToken?: boolean;
//   apiKey?: boolean;
//   google?: boolean;
// }

// export interface IDocRequestOptions {
//   params?: ApiParamOptions[];
//   queries?: ApiQueryOptions[];
//   bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
// }
