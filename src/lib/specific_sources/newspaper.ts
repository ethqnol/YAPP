export interface Newspaper {
  title: string;
  authors: string[];
  publication: string; //newspaper name
  place: string;
  date: number | null;
  section: string;
  identifier: string;
  edition: number | null;
}