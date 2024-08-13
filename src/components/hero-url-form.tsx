"use client";

import { useState } from "react";
import { MessageCircleIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const HeroUrlForm = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (url) {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter website URL"
          className="max-w-lg flex-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit">
          <MessageCircleIcon className="w-5 h-5 mr-2" />
          Chat Now
        </Button>
      </form>
    </div>
  );
};
