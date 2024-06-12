import type Notecard from "./notecard";

export default interface DatabaseNotecard {
  primary_id : string;
  notecard : Notecard;
}