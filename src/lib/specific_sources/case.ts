export interface Case {
  case_name: string;
  authors: string[];
  court: string;
  docket_number: string;
  reporter: string;
  reporter_volume: number | null;
  first_page: number | null;
  history: string;
  identifier: string;
}