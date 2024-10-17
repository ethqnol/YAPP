import type Source from "../source";
import type { Case } from "../specific_sources/case";}


export default function generate_case_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as Case).authors.forEach((author, index) => {
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
  full_citation += (source.source_specific as Case).case_name ?  (source.source_specific as Case).case_name + ", " : "";
  full_citation += (source.source_specific as Case).reporter_volume ?? "";
  full_citation += (source.source_specific as Case).reporter ?? "";
  full_citation += (source.source_specific as Case).first_page ?? "";
  full_citation += (source.source_specific as Case).court ? "(" + (source.source_specific as Case).court + ((source.source_specific as Case).decided ? ", " + (source.source_specific as Case).decided : "" ) + ")." : ".";
  return full_citation;
}