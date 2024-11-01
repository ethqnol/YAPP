import type Source from "../source";
import type { Bill } from "../specific_sources/bill";

export default function generate_bill_citation(source: Source): string {
  let full_citation = "";
  let bill = source.source_specific as Bill;
  let formatted_sponsors : string[] = [];
  bill.sponsors.forEach((sponsor, index) => {
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
  full_citation += bill.title;
  full_citation += bill.bill_number != "" ? ", Pub. L. No. " + bill.bill_number : "";
  full_citation += bill.section != null ? ", § " + bill.section : "";
  full_citation += bill.code_volume != null ? ", " + bill.code_volume  : "";
  full_citation += bill.code != "" ? ", " + bill.code : "";
  full_citation += bill.identifier != "" ? ". " + bill.identifier + "." : ".";
  return full_citation;
}