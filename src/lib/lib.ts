import type Source from "./source";
import SourceType from "./source_type";
import generate_bill_citation from "./citation_gen/bill";
import generate_book_citation from "./citation_gen/book";
import generate_book_section_citation from "./citation_gen/book_section";
import generate_case_citation from "./citation_gen/case";
import generate_conference_paper_citation from "./citation_gen/conference_paper";
import generate_interview_citation from "./citation_gen/interview";
import generate_journal_citation from "./citation_gen/journal";
import generate_magazine_citation from "./citation_gen/magazine";
import generate_media_citation from "./citation_gen/media";
import generate_newspaper_citation from "./citation_gen/newspaper";
import generate_website_citation from "./citation_gen/website";
import generate_other_citation from "./citation_gen/other";


export function parse_author(author: string): string[] {
  return author.split(" ");
}

export function generate_citation(source: Source): string {
  switch (source.source_type) {
    case SourceType.BILL:
      return generate_bill_citation(source);
    case SourceType.BOOK:
      return generate_book_citation(source);
    case SourceType.BOOK_SECTION:
      return generate_book_section_citation(source);
    case SourceType.CASE:
      return generate_case_citation(source);
    case SourceType.CONFERENCE_PAPER:
      return generate_conference_paper_citation(source);
    case SourceType.INTERVIEW:
      return generate_interview_citation(source);
    case SourceType.JOURNAL:
      return generate_journal_citation(source);
    case SourceType.MAGAZINE:
      return generate_magazine_citation(source);
    case SourceType.MEDIA:
      return generate_media_citation(source);
    case SourceType.NEWSPAPER:
      return generate_newspaper_citation(source);
    case SourceType.WEBSITE:
      return generate_website_citation(source);
    default: 
      return generate_other_citation(source);
  }
}


export function generate_page_number(start: number, end: number): string {
  if (start == end) {
    return start + "";
  } else {
    return start + "-" + end;
  }
}


function format_authors(authors: string[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
  return `${authors[0]} et al`;
}


export function generate_long_footnote(source: Source): string {
  // let authors = source.authors.join(', ');
  // let edition = source.edition ? `, ${source.edition} ed.` : '';
  // let volume = source.volume ? `, vol. ${source.volume}` : '';
  // let series = source.series ? `, ${source.series} ${source.series_num}` : '';
  
  // //Need to reimplement dates
  // let year = source.date ? ` (${new Date(source.date).getFullYear()})` : '';
  // let url = source.identifier ? `, ${source.identifier}` : '';

  // let footnote = `${authors}, *${source.title}*${edition}${volume}${series} (${source.publishing_location}: ${source.publishing_company}${year})${url}.`;
  // return footnote;
}

export function generate_short_footnote(source: Source): string {
  // let authors = source.authors.join(', ');
  // let short_title = source.title.split(' ').slice(0, 4).join(' ') + (source.title.split(' ').length > 4 ? '...' : '');

  // let footnote = `${authors}, *${short_title}* `;
  // return footnote;
}