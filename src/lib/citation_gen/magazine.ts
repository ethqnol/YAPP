import type Source from "../source";
import type { Magazine } from "../specific_sources/magazine";

export default function generate_magazine_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as Magazine).authors.forEach((author, index) => {
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
  full_citation+= (source.source_specific as Magazine).title != "" ? "\"" + (source.source_specific as Magazine).title + ".\"" : "";
  full_citation += (source.source_specific as Magazine).publication != "" ? "*" + (source.source_specific as Magazine).publication + "*" : "";
  full_citation += (source.source_specific as Magazine).date_year ?  ", " + (source.source_specific as Magazine).date_year + ". " : "n.d. ";
  full_citation += (source.source_specific as Magazine).identifier ? (source.source_specific as Magazine).identifier + "." : "";

  return full_citation;
}