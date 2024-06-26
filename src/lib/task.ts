export default interface Task {
  student_id: string
  name: string;
  description: string;
  due_date: number | null;
  creation_date: number;
  completed: boolean;
}