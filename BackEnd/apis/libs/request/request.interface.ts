import { Request } from 'express';
export interface IRequestApp extends Request {
  //Import from express
  user?: Record<string, string>;

  __id: string;
  __xTimestamp?: number;
  __timestamp: number;
  __timezone: string;
  __customLang: string[];
  __xCustomLang: string;
  __version: string;
  __repoVersion: string;

  __class?: string;
  __function?: string;

  //   __pagination?: RequestPaginationSerialization;
}
