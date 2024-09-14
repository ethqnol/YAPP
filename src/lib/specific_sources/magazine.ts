export interface Magazine {
  title: string;
  authors: string[];
  publication: string; //magazine name
  volume: number | null;
  issue: number | null;
  date_month: number | null;
  date_year: number | null;
  identifier: string;
}