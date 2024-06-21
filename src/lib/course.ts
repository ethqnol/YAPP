import type SyllabusItem from "./syllabus";

export default interface Course {
  class_name: string;
  id: string;
  teacher_id: string;
  syllabus: SyllabusItem[];
}