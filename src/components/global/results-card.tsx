import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarIcon, File, YoutubeIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  result: any;
  filters: string;
};

export default function ResultsCard({ result, filters }: Props) {
  const googleimageUrl = result.pagemap?.cse_image?.[0]?.src || "/fallback.jpg";
  const youtubeimageUrl =
    result.snippet?.thumbnails?.default?.url || "/fallback.jpg";
  return (
    <Card className="w-[300px] overflow-hidden">
      <div className="relative">
        <img
          src={
            result.kind === "customsearch#result"
              ? googleimageUrl
              : youtubeimageUrl
          }
          alt="Blog post thumbnail"
          className="w-full h-[150px] object-cover"
        />
        <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
          {filters === "google" ? (
            <File className="h-4 w-4 text-primary" />
          ) : filters === "youtube" ? (
            <YoutubeIcon className="h-4 w-4 text-primary" />
          ) : result.kind === "customsearch#result" ? (
            <File className="h-4 w-4 text-primary" />
          ) : (
            <YoutubeIcon className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
      <CardHeader>
        <Link
          href={
            result.kind === "customsearch#result"
              ? result.link
              : `https://www.youtube.com/watch?v=${result.id.videoId}`
          }
          target="_blank"
        >
          <h3 className="text-lg font-semibold">
            {result.kind === "customsearch#result"
              ? result.title
              : result.snippet.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {result.kind === "customsearch#result"
            ? result.snippet
            : result.snippet.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          {result.kind === "youtube#searchResult" && (
            <>
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span>{result.snippet.publishedAt.split("T")[0]}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
