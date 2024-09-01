export default interface Syllabus {
  user_id: string
  name: string;
  description: string;
  due_date: number | null;
  creation_date: number;
  completed: boolean;
  class_id: string;
}