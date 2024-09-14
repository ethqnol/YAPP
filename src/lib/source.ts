import SourceType from "./source_type";
import type { Bill } from "./specific_sources/bill";
import type { Book } from "./specific_sources/book";
import type { BookSection } from "./specific_sources/book_section";
import type { Newspaper } from "./specific_sources/newspaper";
import type { Website } from "./specific_sources/website";
import type { Interview } from "./specific_sources/interview";
import type { ConferencePaper } from "./specific_sources/conference_paper";
import type { Journal } from "./specific_sources/journal";
import type { Magazine } from "./specific_sources/magazine";
import type { Media } from "./specific_sources/media";
import type { Other } from "./specific_sources/other";
import type { Case } from "./specific_sources/case";


export default interface Source {
  //general fields
  source_type: SourceType;
  full_citation: string;
  footnote_long: string;
  footnote_short: string;
  student_id: string;
  access_date: number | null;
  source_specific: Bill | Book | BookSection | Case | ConferencePaper | Interview | Journal | Magazine | Media | Newspaper | Other | Website;
  
}