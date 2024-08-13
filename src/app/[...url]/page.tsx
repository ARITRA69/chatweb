import { ChatWrapper } from "@/components/chat-wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponent = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponent.join("/");
}

export default async function Page({ params }: PageProps) {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  const sessionId = "mock-session-id";

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: {
        chunkOverlap: 50,
        chunkSize: 200,
      },
    });
    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <div className="flex gap-2 w-full bg-primary">
        <ResizablePanel minSize={30} className="py-4 pl-4">
          <embed src={reconstructedUrl} className="w-full h-full rounded-2xl" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} className="py-4 pr-4 h-screen">
          <ChatWrapper sessionId={sessionId} />
        </ResizablePanel>
      </div>
    </ResizablePanelGroup>
  );
}
