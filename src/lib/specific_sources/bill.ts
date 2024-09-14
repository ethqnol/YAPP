export interface Bill {
  title: string;
  sponsors: string[];
  bill_number: string;
  code: string;
  code_volume: number | null;
  section: number | null;
  date: number | null;
  code_pages: number | null;
  identifier: string;
}