import type Source from "../source";
import type { Newspaper } from "../specific_sources/newspaper";
export default function generate_newspaper_citation(source: Source): string {
  let full_citation = "";
  let newspaper = source.source_specific as Newspaper;
  let formatted_authors : string[] = [];
  newspaper.authors.forEach((author, index) => {
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
  full_citation+= newspaper.title != "" ? "\"" + newspaper.title + ".\"" : "";
  full_citation += newspaper.publication != "" ? "*" + newspaper.publication + "*" : "";
  full_citation += newspaper.date ?  ", " + newspaper.date : "n.d. ";
  full_citation += newspaper.edition ? ", " + newspaper.edition + "edition" : "";
  full_citation += newspaper.section ? ", sec. " + newspaper.section + ". " : "";
  full_citation += newspaper.identifier ? newspaper.identifier + "." : "";

  return full_citation;
}