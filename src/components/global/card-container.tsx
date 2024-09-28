import React from "react";
import ResultsCard from "./results-card";

type Props = {
  filters: string;
  googleSearchResults: { items: any[] };
  youtubeSearchResults: { items: any[] };
};

const CardContainer = ({
  filters,
  googleSearchResults,
  youtubeSearchResults,
}: Props) => {
  if (!googleSearchResults.items.length && !youtubeSearchResults.items.length) {
    return (
      <div className="py-12 w-full flex items-center justify-center">
        Enter a keyword to see results!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {filters === "all" ? (
        <>
          {googleSearchResults.items.map((result: any) => (
            <ResultsCard filters={filters} result={result} />
          ))}
          {youtubeSearchResults.items.map((result) => (
            <ResultsCard filters={filters} result={result} />
          ))}
        </>
      ) : filters === "google" ? (
        <>
          {googleSearchResults.items.map((result) => (
            <ResultsCard filters={filters} result={result} />
          ))}
        </>
      ) : (
        <>
          {youtubeSearchResults.items.map((result) => (
            <ResultsCard filters={filters} result={result} />
          ))}
        </>
      )}
    </div>
  );
};

export default CardContainer;
