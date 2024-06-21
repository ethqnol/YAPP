import type Source from "./source";

export function parse_author(author: string): string[] {
    return author.split(" ");
}

export function generate_citation(source: Source): string {
    let citation = '';

    citation += format_authors(source.authors) + '. ';

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
    let year = source.publishing_year ? ` (${source.publishing_year})` : '';
    let url = source.url ? `, ${source.url}` : '';

    let footnote = `${authors}, *${source.title}*${edition}${volume}${series} (${source.publishing_location}: ${source.publishing_company}${year})${url}.`;
    return footnote;
}

export function generate_short_footnote(source: Source): string {
    let authors = source.authors.join(', ');
    let short_title = source.title.split(' ').slice(0, 4).join(' ') + (source.title.split(' ').length > 4 ? '...' : '');

    let footnote = `${authors}, *${short_title}* `;
    return footnote;
}