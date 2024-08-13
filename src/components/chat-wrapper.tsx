"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Messages } from "@/components/messages";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import { z } from "zod";

export const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const { messages, handleInputChange, handleSubmit, input, isLoading } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
    });

  const inputSchema = z.string().min(1, { message: "Input cannot be empty" });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      validateAndSubmit();
    }
  };

  const validateAndSubmit = () => {
    const validation = inputSchema.safeParse(input);

    if (validation.success) {
      handleSubmit();
    } else {
      console.error(validation.error.format());
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-between gap-2 rounded-2xl bg-background">
      <div className="flex-1 flex flex-col justify-between">
        <Messages messages={messages} isLoading={isLoading} />
      </div>
      <div className="bg-foreground py-4 px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateAndSubmit();
          }}
          className="flex gap-2 min-w-32 mx-auto"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask your question..."
            className="h-32 rounded-xl text-lg"
            readOnly={isLoading}
          />
          <Button
            type="submit"
            className="rounded-full h-12 w-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
