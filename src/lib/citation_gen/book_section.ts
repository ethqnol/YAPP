import type Source from "../source";
import type { BookSection } from "../specific_sources/book_section";

export default function generate_book_section_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as BookSection).authors.forEach((author, index) => {
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
  full_citation += (source.source_specific as BookSection).section_title != "" ? "\"" + (source.source_specific as BookSection).section_title + "\". " : "";
  full_citation += "*" + (source.source_specific as BookSection).book_title + "*" + ". ";
  full_citation += (source.source_specific as BookSection).edition ? (source.source_specific as BookSection).edition + ". " : ""; 
  full_citation += (source.source_specific as BookSection).volume ? "vol. " + (source.source_specific as BookSection).volume + ". " : "";
  full_citation += (source.source_specific as BookSection).number_of_volumes ?  (source.source_specific as BookSection).number_of_volumes + " vols." : "";
  full_citation += (source.source_specific as BookSection).publishing_location != "" ? (source.source_specific as BookSection).publishing_location + ": " : "";
  full_citation += (source.source_specific as BookSection).publisher != "" ? (source.source_specific as BookSection).publisher + ", " : "";
  full_citation += (source.source_specific as BookSection).date ? (source.source_specific as BookSection).date + ". " : "";
  full_citation += (source.source_specific as BookSection).identifier != "" ? (source.source_specific as BookSection).identifier + ". " : "";
  
  return full_citation;
}