import type Source from "../source";
import type { Interview } from "../specific_sources/interview";

export default function generate_interview_citation(source: Source): string {
  let interview = source.source_specific as Interview
  let full_citation = "";
  let formatted_authors : string[] = [];
  interview.authors.forEach((author, index) => {
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
  full_citation += interview.title + interview.medium != "" ? ". " + interview.medium + ", " : ", ";
  full_citation += interview.date ? interview.date + ". " : "n.d. ";
  full_citation += interview.identifier ? interview.identifier + ". " : "";
  return full_citation;
}