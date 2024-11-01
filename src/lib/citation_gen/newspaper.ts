import type Source from "../source";
import type { Newspaper } from "../specific_sources/newspaper";
export default function generate_newspaper_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as Newspaper).authors.forEach((author, index) => {
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
  full_citation+= (source.source_specific as Newspaper).title != "" ? "\"" + (source.source_specific as Newspaper).title + ".\"" : "";
  full_citation += (source.source_specific as Newspaper).publication != "" ? "*" + (source.source_specific as Newspaper).publication + "*" : "";
  full_citation += (source.source_specific as Newspaper).date ?  ", " + (source.source_specific as Newspaper).date : "n.d. ";
  full_citation += (source.source_specific as Newspaper).edition ? ", " + (source.source_specific as Newspaper).edition + "edition" : "";
  full_citation += (source.source_specific as Newspaper).section ? ", sec. " + (source.source_specific as Newspaper).section + ". " : "";
  full_citation += (source.source_specific as Newspaper).identifier ? (source.source_specific as Newspaper).identifier + "." : "";

  return full_citation;
}