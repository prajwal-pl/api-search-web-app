"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CardContainer from "../global/card-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, File, Youtube } from "lucide-react";

export function MainComponent() {
  const [value, setValue] = useState("");
  const [googleSearchResults, setGoogleSearchResults] = useState<{
    items: any[];
  }>({ items: [] });
  const [youtubeSearchResults, setYoutubeSearchResults] = useState<{
    items: any[];
  }>({ items: [] });
  const [filters, setFilters] = useState("all");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const googleResponse = await fetch(
        `http://localhost:9000/api/google?query=${value}`
      );
      const youtubeResponse = await fetch(
        `http://localhost:9000/api/youtube?query=${value}`
      );
      const googleData = await googleResponse.json();
      const youtubeData = await youtubeResponse.json();
      setGoogleSearchResults(googleData);
      setYoutubeSearchResults(youtubeData);
      console.log(googleSearchResults, youtubeSearchResults);
    } catch (error) {
      console.log(error);
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
      <div>
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
              <File className="w-4 h-4 shrink-0" /> Blogs, Articles & News
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setFilters("youtube")}
            >
              <Youtube className="w-4 h-4 shrink-0" /> Videos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <CardContainer
          googleSearchResults={googleSearchResults}
          youtubeSearchResults={youtubeSearchResults}
          filters={filters}
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
