export default interface Notecard {
  source_id: string;
  student_id: string;
  quote: string;
  title: string;
  analysis: string;
  start_page: number;
  end_page: number;
  tags: string[];
}