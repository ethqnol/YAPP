import type Source from "../source";
import type { Interview } from "../specific_sources/interview";

export default function generate_interview_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as Interview).authors.forEach((author, index) => {
    let author_format = ""
    if (index == 0) {
      let author_name = author.trim().split(" ")[0];
      author_format = author.trim().split(" ").slice(1).join(" ") ? author.trim().split(" ").slice(1).join(" ") + ", " + author_name : author_name;
    } else {
      author_format = author.trim();
    }

    formatted_authors.push(author_format);
  });
  full_citation += formatted_authors.join(", ") + ". ";
  full_citation += (source.source_specific as Interview).title + (source.source_specific as Interview).medium != "" ? ". " + (source.source_specific as Interview).medium + ", " : ", ";
  full_citation += (source.source_specific as Interview).date ? (source.source_specific as Interview).date + ". " : "";
  full_citation += (source.source_specific as Interview).identifier ? (source.source_specific as Interview).identifier + ". " : "";
  return full_citation;
}