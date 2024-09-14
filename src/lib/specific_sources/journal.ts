export interface Journal {
  title: string;
  authors: string[];
  publication: string; //journal name
  volume: number | null;
  issue: number | null;
  date_month: number | null;
  date_year: number | null;
  identifier: string;
  
}