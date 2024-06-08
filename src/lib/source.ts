export default interface Source {
  title: string;
  author_full: string;
  author_first: string;
  author_last: string;
  author_mi: string;
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