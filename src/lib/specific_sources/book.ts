export interface Book {
  title: string;
  authors: string[];
  volume: number | null;
  number_of_volumes: number | null;
  edition: number | null;
  publisher: string;
  publishing_location: string;
  date: number | null; //year
  original_date: number | null;
  identifier: string; //doi or isbn (unnecesarily specific to put both)
  
}
