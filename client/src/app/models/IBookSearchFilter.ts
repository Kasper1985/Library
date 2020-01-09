export interface IBookSearchFilter {
  text: string;
  author?: string;
  year?: number;
  existing?: boolean | 'even';
}
