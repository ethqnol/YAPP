export interface BookSection {
  section_title: string;
  book_title: string;
  authors: string[];
  editors: string[];
  translators: string[];
  volume: number | null;
  number_of_volumes: number | null;
  edition: number | null;
  publisher: string;
  publishing_location: string;
  date: number | null;
  original_date: number | null;
  identifier: string; //doi or isbn (unnecesarily specific to put both)
}