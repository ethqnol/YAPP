import type Source from "../source";
import type { Journal } from "../specific_sources/journal";

export default function generate_journal_citation(source: Source): string {
  let journal = source.source_specific as Journal
  let full_citation = "";
  let formatted_authors : string[] = [];
  journal.authors.forEach((author, index) => {
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
  full_citation += journal.title != "" ? "\"" + journal.title + ".\" " : "";
  full_citation += journal.publication != "" ? "*"+journal.publication + "* " : "";
  full_citation += journal.volume ? journal.volume : "";
  full_citation += journal.issue ? ", no. " + journal.issue : "";
  full_citation += "(" + (journal.date_year ? journal.date_year : "n.d.")+  ")";
   
  return full_citation;
}