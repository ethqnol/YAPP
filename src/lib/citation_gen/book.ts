import type Source from "../source";
import type { Book } from "../specific_sources/book";

export default function generate_book_citation(source: Source): string {
  let full_citation = "";
  let formatted_authors : string[] = [];
  (source.source_specific as Book).authors.forEach((author, index) => {
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
  full_citation += "*" + (source.source_specific as Book).title + "*" + ". ";
  full_citation += (source.source_specific as Book).edition ? (source.source_specific as Book).edition + ". " : ""; 
  full_citation += (source.source_specific as Book).volume ? "vol. " + (source.source_specific as Book).volume + ". " : "";
  full_citation += (source.source_specific as Book).number_of_volumes ?  (source.source_specific as Book).number_of_volumes + " vols." : "";
  full_citation += (source.source_specific as Book).publishing_location ? (source.source_specific as Book).publishing_location + ": " : "";
  full_citation += (source.source_specific as Book).publisher ? (source.source_specific as Book).publisher + ", " : "";
  full_citation += (source.source_specific as Book).publisher ? (source.source_specific as Book).publisher + ", " : "";
  full_citation += (source.source_specific as Book).date ? (source.source_specific as Book).date + ". " : "";
  full_citation += (source.source_specific as Book).identifier ? (source.source_specific as Book).identifier + ". " : "";
  
  return full_citation;
}