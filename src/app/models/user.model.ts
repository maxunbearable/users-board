export interface User {
  FullName: string;
  Status: number | string;
  dateTime: number;
  id: string | number;
}

export enum UserQueneStatus {
  inLine = 0,
  active = 1,
  inactive = 2,
}
