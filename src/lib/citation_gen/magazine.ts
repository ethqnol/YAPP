import type Source from "../source";
import type { Magazine } from "../specific_sources/magazine";

export default function generate_magazine_citation(source: Source): string {
  let full_citation = "";
  let magazine = source.source_specific as Magazine;
  let formatted_authors : string[] = [];
  magazine.authors.forEach((author, index) => {
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
  full_citation+= magazine.title != "" ? "\"" + magazine.title + ".\"" : "";
  full_citation += magazine.publication != "" ? "*" + magazine.publication + "*" : "";
  full_citation += magazine.date_year ?  ", " + magazine.date_year + ". " : "n.d. ";
  full_citation += magazine.identifier ? magazine.identifier + "." : "";

  return full_citation;
}