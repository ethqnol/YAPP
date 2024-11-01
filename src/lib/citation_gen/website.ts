import type Source from "../source";
import type { Website } from "../specific_sources/website";}
export default function generate_website_citation(source: Source): string {
  let website = source.source_specific as Website;
  let full_citation = ""
  
  let formatted_authors : string[] = [];
  (source.source_specific as Website).authors.forEach((author, index) => {
    let author_format = ""
    if (index == 0) {
      let author_name = author.trim().split(" ")[0];
      author_format = author.trim().split(" ").slice(1).join(" ") ? author.trim().split(" ").slice(1).join(" ") + ", " + author_name : author_name;
    } else {
      author_format = author.trim();
    }

    formatted_authors.push(author_format);
  });
  
  full_citation += website.title != "" ? "\"" + website.title + ".\" " : "";
  full_citation += website.website_title != "" ? website.website_title + ". " : "";
  full_citation += website.publisher != "" ? website.publisher + ", " : "";
  full_citation += "(" + (website.date ? website.date : "n.d.")+  ")";
  full_citation += website.url != "" ? website.url + ". " : ""
  
  return full_citation;
  
}