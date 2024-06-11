import { Mail } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a href="mailto:hello@example.com" target="_blank" rel="noreferrer">
            <span className="sr-only">Main</span>
            <Mail className="h-6 w-6" />
          </a>
          <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <span className="sr-only">Twitter</span>
            <Icons.Twitter className="h-6 w-6" />
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <span className="sr-only">GitHub</span>
            <Icons.GitHub className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
