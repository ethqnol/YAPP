import type Source from "../source";
import type { Journal } from "../specific_sources/journal";

export default function generate_journal_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as Journal).authors.forEach((author, index) => {
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
  full_citation += (source.source_specific as Journal).title != "" ? "\"" + (source.source_specific as Journal).title + ".\" " : "";
  full_citation += (source.source_specific as Journal).publication != "" ? "*"+(source.source_specific as Journal).publication + "* " : "";
  full_citation += (source.source_specific as Journal).volume ? (source.source_specific as Journal).volume : "";
  full_citation += (source.source_specific as Journal).issue ? ", no. " + (source.source_specific as Journal).issue : "";
  full_citation += (source.source_specific as Journal).date_year ? " (" + (source.source_specific as Journal).date_year + "): " : "";
  
  return full_citation;
}