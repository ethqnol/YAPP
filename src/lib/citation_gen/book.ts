import type Source from "../source";
import type { Book } from "../specific_sources/book";

export default function generate_book_citation(source: Source): string {
  let book = source.source_specific as Book;
  let full_citation = "";
  let formatted_authors : string[] = [];
  book.authors.forEach((author, index) => {
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
  full_citation += "*" + book.title + "*" + ". ";
  full_citation += book.edition ? book.edition + ". " : ""; 
  full_citation += book.volume ? "vol. " + book.volume + ". " : "";
  full_citation += book.number_of_volumes ?  book.number_of_volumes + " vols." : "";
  full_citation += book.publishing_location != "" ? book.publishing_location + ": " : "";
  full_citation += book.publisher != "" ? book.publisher + ", " : "";
  full_citation += book.publisher != "" ? book.publisher + ", " : "";
  full_citation += book.date ? book.date + ". " : "n.d. ";
  full_citation += book.identifier != "" ? book.identifier + ". " : "";
  
  return full_citation;
}