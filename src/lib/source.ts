import SourceType from "./source_type";

export default interface Source {
  //general fields
  source_type: SourceType;
  full_citation: string;
  footnote_long: string;
  footnote_short: string;
  student_id: string;
  title: string;
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
  
  //**Journal**
  // publishing_company represents "publication"
  // edition represents "issue"
  // isbn represents "ISSN"
  /* Also includes
      - URL
      - volume
      - pages
      - date
      - series
      - language
      - doi
      - url
      - accessed
  */
  
  //**Website**
  //publishing_company represents "publisher"
  /* Also includes
      - URL
      - date
      - accessed
      - language
  */
  
  //**Newspaper**
  //publishing_company represents "publication"
  //publishing_location represents "place"
  //isbn represents "ISSN"
  //series represents "section"
  /* Also includes
      - URL
      - date
      - accessed
      - language
  */
  
  //**Letter**
  //publishing_company represents "recipient"
  /* Also includes
      - URL
      - date
      - accessed
      - language
  */
  
  //**Dataset**
  //publishing_company represents "publisher"
  /* Also includes
      - URL
  */ 
  
  //**CASE**
  //publishing_location represents "court"
  //isbn represents "docket number"
  //publishing_company represents "reporter"
  //volume represente "reporter volume"
  //pages represents "first page of case""
  /* Also includes
      - Language
      - URL
  */
  history: string;
  
  

  
  //**Manuscript**
  // volume represents "archival number"
  // series_num represents "box number"
  // series represents "collection"
  // publishing_location represents "repository/library location"
  /* Also includes
      - URL
      - date
      - accessed
      - language
  */
  
  //**Video**
  // series represents "series title"
  // publishing location represents "location"
  // pages represents "run time"
  // publishing_company represents "studio"
  /*
    Also includes
      - URL
      - date
      - accessed
      - language
      - isbn 
      
  */
  
  
  
}