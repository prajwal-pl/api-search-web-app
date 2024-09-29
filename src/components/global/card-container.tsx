import React from "react";
import ResultsCard from "./results-card";
import { Loader2 } from "lucide-react";

type Props = {
  filters: string;
  googleSearchResults: { items: any[] };
  youtubeSearchResults: { items: any[] };
  scholarSearchResults: { organic_results: any[] };
  loading: boolean;
};

const CardContainer = ({
  filters,
  loading,
  googleSearchResults,
  youtubeSearchResults,
  scholarSearchResults,
}: Props) => {
  if (!googleSearchResults.items.length && !youtubeSearchResults.items.length) {
    return (
      <div className="py-12 w-full flex items-center justify-center">
        Enter a keyword to see results!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="animate-spin w-full flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {filters === "all" ? (
        <>
          {googleSearchResults.items?.map((result: any) => (
            <ResultsCard result={result} />
          ))}
          {youtubeSearchResults.items?.map((result) => (
            <ResultsCard result={result} />
          ))}
          {scholarSearchResults.organic_results?.map((result) => (
            <ResultsCard result={result} />
          ))}
        </>
      ) : filters === "google" ? (
        <>
          {googleSearchResults.items?.map((result) => (
            <ResultsCard result={result} />
          ))}
        </>
      ) : filters === "youtube" ? (
        <>
          {youtubeSearchResults.items?.map((result) => (
            <ResultsCard result={result} />
          ))}
        </>
      ) : (
        <>
          {scholarSearchResults.organic_results?.map((result) => (
            <ResultsCard result={result} />
          ))}
        </>
      )}
    </div>
  );
};

export default CardContainer;
