import type Source from "./source";

export default interface DatabaseSource {
    source: Source,
    primary_id: string
}