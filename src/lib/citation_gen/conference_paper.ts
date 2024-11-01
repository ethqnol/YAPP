import type Source from "../source";
import type { ConferencePaper } from "../specific_sources/conference_paper"; 

export default function generate_conference_paper_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as ConferencePaper).authors.forEach((author, index) => {
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
  full_citation += "\"" + (source.source_specific as ConferencePaper).title + ".\" ";
  full_citation += (source.source_specific as ConferencePaper).proceedings_title != "" ? "In *" + (source.source_specific as ConferencePaper).proceedings_title + "*, " : "";
  full_citation += (source.source_specific as ConferencePaper).volume ? (source.source_specific as ConferencePaper).volume + ((source.source_specific as ConferencePaper).pages != "" ? ":" + (source.source_specific as ConferencePaper).pages + ". " : ". ") : "";
  full_citation += (source.source_specific as ConferencePaper).place != "" ? (source.source_specific as ConferencePaper).place : "";
  full_citation += (source.source_specific as ConferencePaper).publisher != "" ? ((source.source_specific as ConferencePaper).place != "" ? ": " : " ") + (source.source_specific as ConferencePaper).place : "";
  full_citation += (source.source_specific as ConferencePaper).date ? ", " + (source.source_specific as ConferencePaper).date + ". " : "";
  full_citation += (source.source_specific as ConferencePaper).identifier ? (source.source_specific as ConferencePaper).identifier + ". " : "";
  
  full_citation += (source.source_specific as ConferencePaper).conference_name ? " " + (source.source_specific as ConferencePaper).conference_name + "." : "";
  
  return full_citation
}