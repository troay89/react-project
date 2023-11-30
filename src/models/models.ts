interface DataPerson {
  username: string;
  age: string;
  email: string;
  firstPassword: string;
  secondPassword: string;
  country: string;
  gender: string;
  download: string | Blob[] | Blob;
}

export type { DataPerson };
