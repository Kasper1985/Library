export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  exists: boolean;
  publisher?: string;
  isbn?: string;
  cover?: string;
}
