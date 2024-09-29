import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CalendarIcon,
  File,
  Globe2,
  GlobeIcon,
  PaperclipIcon,
  YoutubeIcon,
} from "lucide-react";
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
              : result.kind === "youtube#searchResult"
              ? youtubeimageUrl
              : "/fallback.jpg"
          }
          alt="Blog post thumbnail"
          className="w-full h-[150px] object-cover"
        />
        <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
          {result.kind === "customsearch#result" ? (
            <GlobeIcon className="h-4 w-4 text-primary" />
          ) : result.kind === "youtube#searchResult" ? (
            <YoutubeIcon className="h-4 w-4 text-primary" />
          ) : (
            <File className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
      <CardHeader>
        <Link
          href={
            result.kind === "customsearch#result"
              ? result.link
              : result.kind === "youtube#searchResult"
              ? `https://www.youtube.com/watch?v=${result.id.videoId}`
              : result.link
          }
          target="_blank"
        >
          <h3 className="text-lg font-semibold hover:text-blue-500">
            {result.kind === "customsearch#result"
              ? result.title
              : result.kind === "youtube#searchResult"
              ? result.snippet.title
              : result.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {result.kind === "customsearch#result"
            ? result.snippet
            : result.kind === "youtube#searchResult"
            ? result.snippet.description
            : result.snippet}
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
