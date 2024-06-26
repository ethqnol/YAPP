import type Task from "./task";

export default interface DatabaseTask {
  primary_id : string;
  task : Task;
}