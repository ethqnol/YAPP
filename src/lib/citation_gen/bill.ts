import type Source from "../source";
import type { Bill } from "../specific_sources/bill";

export default function generate_bill_citation(source: Source): string {
  let full_citation = "";
  
  let formatted_sponsors : string[] = [];
  (source.source_specific as Bill).sponsors.forEach((sponsor, index) => {
    let sponsor_format = ""
    if (index == 0) {
      let sponsor_name = sponsor.trim().split(" ")[0];
      sponsor_format = sponsor.trim().split(" ").slice(1).join(" ") ? sponsor.trim().split(" ").slice(1).join(" ") + ", " + sponsor_name : sponsor_name;
    } else {
      sponsor_format = sponsor.trim();
    }

    formatted_sponsors.push(sponsor_format);
  });
  full_citation += formatted_sponsors.join(", ") + ". ";
  full_citation += (source.source_specific as Bill).title;
  full_citation += (source.source_specific as Bill).bill_number != "" ? ", Pub. L. No. " + (source.source_specific as Bill).bill_number : "";
  full_citation += (source.source_specific as Bill).section != null ? ", § " + (source.source_specific as Bill).section : "";
  full_citation += (source.source_specific as Bill).code_volume != null ? ", " + (source.source_specific as Bill).code_volume  : "";
  full_citation += (source.source_specific as Bill).code != "" ? ", " + (source.source_specific as Bill).code : "";
  full_citation += (source.source_specific as Bill).identifier != "" ? ". " + (source.source_specific as Bill).identifier + "." : ".";
  return full_citation;
}