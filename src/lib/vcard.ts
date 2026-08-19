import { site } from "@/data/site";

/** Build a vCard 3.0 string for "Save to contacts". */
export function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.name}`,
    "N:Voronin;Mykola;;;",
    `TITLE:${site.role}`,
    `EMAIL;TYPE=INTERNET,PREF:${site.email}`,
    `URL:${site.siteUrl}`,
    `ADR;TYPE=HOME:;;${site.location};;;;`,
    `NOTE:${site.shortBio}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${site.linkedin}`,
    `X-SOCIALPROFILE;TYPE=github:${site.github}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mykola-voronin.vcf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // iOS often ignores `download` and opens the file instead — keep the blob
  // alive long enough for Contacts to read it.
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export const cardUrl = `${site.siteUrl}/card`;
