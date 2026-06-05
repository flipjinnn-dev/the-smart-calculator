import fs from "fs";
import { EDGE_SECURITY_HEADERS } from "../lib/security-headers.mjs";

const vercel = {
  headers: [
    {
      source: "/(.*)",
      headers: EDGE_SECURITY_HEADERS,
    },
  ],
};

fs.writeFileSync("vercel.json", `${JSON.stringify(vercel, null, 2)}\n`);
console.log(
  `Updated vercel.json with ${EDGE_SECURITY_HEADERS.length} edge security headers (CSP excluded).`
);
