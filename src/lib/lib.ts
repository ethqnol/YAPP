import type Source from "./source";

export function parse_author(author : string) : string[] {
  return author.split(" ");
}

export function generate_citation(source: Source): string {
    let citation = '';

    if (source.authors && source.authors.length > 0) {
        citation += source.authors.join(', ') + '. ';
    }

    if (source.title) {
        citation += source.title + '. ';
    }

    if (source.series) {
        citation += source.series;
        if (source.series_num) {
            citation += ' ' + source.series_num;
        }
        citation += '. ';
    }

    if (source.edition) {
        citation += source.edition + ' ed. ';
    }

    if (source.volume) {
        citation += 'vol. ' + source.volume + '. ';
    }

    if (source.publishing_location) {
        citation += source.publishing_location + ': ';
    }

    if (source.publishing_company) {
        citation += source.publishing_company + ', ';
    }

    if (source.publishing_year) {
        citation += source.publishing_year + '. ';
    }

    if (source.isbn) {
        citation += 'ISBN ' + source.isbn + '. ';
    }

    if (source.doi) {
        citation += 'doi:' + source.doi + '. ';
    }

    citation = citation.trim();

    if (!citation.endsWith('.')) {
        citation += '.';
    }

    return citation;
}

export function generate_page_number(start : number, end : number) : string {
    if(start == end){
        return start + "";
    } else {
        return start + "-" + end;
    }
}