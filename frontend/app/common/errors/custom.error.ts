export class CustomError<T> {
  public readonly _error: TypeError<T>;
  constructor(error: TypeError<T>) {
    this._error = error;
  }
}

export interface TypeError<T> {
  message: string | Object | Array<T> | any;
}
