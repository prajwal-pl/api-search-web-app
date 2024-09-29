"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CardContainer from "../global/card-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, File, Globe2, Youtube } from "lucide-react";

export function MainComponent() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleSearchResults, setGoogleSearchResults] = useState<{
    items: any[];
  }>({ items: [] });
  const [youtubeSearchResults, setYoutubeSearchResults] = useState<{
    items: any[];
  }>({ items: [] });
  const [scholarSearchResults, setScholarSearchResults] = useState<{
    organic_results: any[];
  }>({ organic_results: [] });
  const [filters, setFilters] = useState("all");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const googleResponse = await fetch(
        `https://api-search-web-app-backend-7.onrender.com/api/google?query=${value}`
      );
      const youtubeResponse = await fetch(
        `https://api-search-web-app-backend-7.onrender.com/api/youtube?query=${value}`
      );
      const scholarResponse = await fetch(
        `https://api-search-web-app-backend-7.onrender.com/api/scholar?query=${value}`
      );
      const scholarData = await scholarResponse.json();
      const googleData = await googleResponse.json();
      const youtubeData = await youtubeResponse.json();
      setScholarSearchResults(scholarData);
      setGoogleSearchResults(googleData);
      setYoutubeSearchResults(youtubeData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 justify-center w-full h-full">
      <div className="flex items-center w-full max-w-md bg-background rounded-lg shadow-sm border border-input">
        <form onSubmit={handleSubmit} className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            Filters <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilters("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setFilters("google")}
            >
              <Globe2 className="w-4 h-4 shrink-0" /> Blogs, Articles & News
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setFilters("youtube")}
            >
              <Youtube className="w-4 h-4 shrink-0" /> Videos
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setFilters("scholar")}
            >
              <File className="w-4 h-4 shrink-0" /> Academic Papers
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p>{filters}</p>
      </div>
      <div>
        <CardContainer
          googleSearchResults={googleSearchResults}
          youtubeSearchResults={youtubeSearchResults}
          scholarSearchResults={scholarSearchResults}
          filters={filters}
          loading={loading}
        />
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
