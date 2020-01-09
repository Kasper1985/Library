export interface IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  exists: boolean;
  publisher?: string;
  isbn?: string;
  cover?: string;
}
