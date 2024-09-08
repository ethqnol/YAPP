import type Source from "./source";

export function parse_author(author: string): string[] {
  return author.split(" ");
}

export function generate_citation(source: Source): string {
  //the whole logic has gone to absolute sh*t. will fix later
  //going to reimplement later. foobar for now
  
  return "foobar"
  // let citation = '';

  // // Format authors in "Last, First" format
  // const formatted_authors = source.authors.map(author => {
  //   const [first_name, ...last_name] = author.split(' ');
  //   return `${last_name.join(' ')}, ${first_name}`;
  // }).join(', ');

  // citation += formatted_authors + '. ';

  // if (source.title && source.title.toLowerCase() !== 'unknown') {
  //   citation += `*${source.title}*. `;
  // }

  // if (source.series && source.series.toLowerCase() !== 'unknown') {
  //   citation += `${source.series}`;
  //   if (source.series_num && source.series_num != null) {
  //     citation += ` ${source.series_num}`;
  //   }
  //   citation += '. ';
  // }

  // if (source.edition && source.edition != null) {
  //   citation += `${source.edition} ed. `;
  // }

  // if (source.volume && source.volume != null) {
  //   citation += `vol. ${source.volume}. `;
  // }

  // if (source.publishing_location && source.publishing_location.toLowerCase() !== 'unknown') {
  //   citation += `${source.publishing_location}: `;
  // } else {
  //   citation += 'np.: ';
  // }

  // if (source.publishing_company && source.publishing_company.toLowerCase() !== 'unknown') {
  //   citation += `${source.publishing_company}, `;
  // } else {
  //   citation += 'np., ';
  // }

  // if (source.publishing_year && source.publishing_year != null) {
  //   citation += `${source.publishing_year}. `;
  // } else {
  //   citation += 'n.d. ';
  // }

  // if (source.isbn && source.isbn.toLowerCase() !== 'unknown') {
  //   citation += `ISBN ${source.isbn}. `;
  // }

  // if (source.doi && source.doi.toLowerCase() !== 'unknown') {
  //   citation += `doi:${source.doi}. `;
  // }

  // citation = citation.trim();

  // if (!citation.endsWith('.')) {
  //   citation += '.';
  // }

  // return citation;
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
  let authors = source.authors.join(', ');
  let edition = source.edition ? `, ${source.edition} ed.` : '';
  let volume = source.volume ? `, vol. ${source.volume}` : '';
  let series = source.series ? `, ${source.series} ${source.series_num}` : '';
  
  //Need to reimplement dates
  let year = source.date ? ` (${new Date(source.date).getFullYear()})` : '';
  let url = source.identifier ? `, ${source.identifier}` : '';

  let footnote = `${authors}, *${source.title}*${edition}${volume}${series} (${source.publishing_location}: ${source.publishing_company}${year})${url}.`;
  return footnote;
}

export function generate_short_footnote(source: Source): string {
  let authors = source.authors.join(', ');
  let short_title = source.title.split(' ').slice(0, 4).join(' ') + (source.title.split(' ').length > 4 ? '...' : '');

  let footnote = `${authors}, *${short_title}* `;
  return footnote;
}