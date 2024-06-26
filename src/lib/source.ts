import SourceType from "./source_type";

export default interface Source {
  source_type: SourceType;
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
  footnote_long: string;
  footnote_short: string;
  student_id: string;
  pages: number | null;
  url: string;
}