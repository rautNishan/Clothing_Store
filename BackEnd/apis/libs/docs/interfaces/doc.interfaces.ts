import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constant';

export interface IDocOptions {
  summary?: string;
  operation?: string;
  deprecated?: boolean;
  description?: string;
}

export interface IDocOfOptions {
  statusCode: number;
  messagePath: string;
  serialization?: ClassConstructor<any>;
}

export interface IDocDefaultOptions extends IDocOfOptions {
  httpStatus: HttpStatus;
}

export interface IDocAuthOptions {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
  apiKey?: boolean;
  google?: boolean;
}

export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
}
