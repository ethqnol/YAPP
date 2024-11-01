import type Source from "../source";
import type { Case } from "../specific_sources/case";


export default function generate_case_citation(source: Source): string {
  let s_case = source.source_specific as Case;
  let full_citation = "";
  let formatted_authors : string[] = [];
  s_case.authors.forEach((author, index) => {
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
  full_citation += s_case.case_name ?  s_case.case_name + ", " : "";
  full_citation += s_case.reporter_volume ?? "";
  full_citation += s_case.reporter ?? "";
  full_citation += s_case.first_page ?? "";
  full_citation += s_case.court ? "(" + s_case.court + (s_case.decided ? ", " + s_case.decided : "" ) + ")." : ".";
  return full_citation;
}