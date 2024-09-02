export default interface User {
  google_photo: string;
  display_name: string;
  email: string;
  google_id: string;
  streak: number;
  max_streak: number;
  awards: string[];
  project_completion: number;
  last_login: string;
  teacher_id: string;
  class_id: string;
  allow_public_streak_record: boolean;
  allow_public_awards_record: boolean;
  allow_public_progress_view: boolean;
  allow_teacher_view: boolean;
}