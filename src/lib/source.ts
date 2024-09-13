import SourceType from "./source_type";

export default interface Source {
  //general fields
  source_type: SourceType;
  full_citation: string;
  footnote_long: string;
  footnote_short: string;
  student_id: string;
  title: string;
  collection_title: string;
  authors: string[];
  editors: string[];
  translators: string[];
  accessed: number | null; //date
  
  //for annotation of sources
  context: string;
  
  //all book fields
  volume: number | null;
  number_of_volumes: number | null;
  edition: number | null;
  series: string;
  series_num: number | null;
  publishing_location: string;
  publishing_company: string;
  date: number | null;
  original_date: number | null;
  isbn: string;
  pages: number | null;
  identifier: string;
  
}