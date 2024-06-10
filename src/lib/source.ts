export default interface Source {
  title: string;
  authors: string[];
  volume: number | null;
  edition: number | null;
  series: string;
  series_num: number | null;
  publishing_location: string;
  publishing_company: string;
  publishing_year: number | null;
  isbn: string;
  doi: string;
  full_citation: string;
}