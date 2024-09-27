"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SearchBar() {
  const [value, setValue] = useState("");
  const [googleSearchResults, setGoogleSearchResults] = useState([]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/google?query=${value}`
      );
      const data = await response.json();
      console.log(data);
      setGoogleSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
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
      <div>Card</div>
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
