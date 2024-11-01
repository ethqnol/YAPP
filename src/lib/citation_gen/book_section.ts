import type Source from "../source";
import type { BookSection } from "../specific_sources/book_section";

export default function generate_book_section_citation(source: Source): string {
  let book_sec = source.source_specific as BookSection;
  let full_citation = "";
  let formatted_authors : string[] = [];
  book_sec.authors.forEach((author, index) => {
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
  full_citation += book_sec.section_title != "" ? "\"" + book_sec.section_title + "\". " : "";
  full_citation += "*" + book_sec.book_title + "*" + ". ";
  full_citation += book_sec.edition ? book_sec.edition + ". " : ""; 
  full_citation += book_sec.volume ? "vol. " + book_sec.volume + ". " : "";
  full_citation += book_sec.number_of_volumes ?  book_sec.number_of_volumes + " vols." : "";
  full_citation += book_sec.publishing_location != "" ? book_sec.publishing_location + ": " : "";
  full_citation += book_sec.publisher != "" ? book_sec.publisher + ", " : "";
  full_citation += book_sec.date ? book_sec.date + ". " : "n.d. ";
  full_citation += book_sec.identifier != "" ? book_sec.identifier + ". " : "";
  
  return full_citation;
}