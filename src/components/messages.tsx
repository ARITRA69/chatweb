"use client";
import { type Message as TMessage } from "ai/react";
import { Message } from "./message";
import { Card } from "@/components/ui/card";
import { CheckIcon, FileQuestionIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessagesProps {
  messages: TMessage[];
  isLoading: boolean;
}

export const Messages = ({ messages, isLoading }: MessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[80vh] flex-col overflow-y-auto">
      {messages.length ? (
        <>
          {messages.map((message, i) => {
            const showSkeleton =
              isLoading && i === messages.length - 1 && message.role !== "user";
            return (
              <Message
                key={i}
                content={message.content}
                isUserMessage={message.role === "user"}
                timeStamp={message.createdAt}
                isLoading={showSkeleton}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <Card className="w-full max-w-md p-6 grid gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">You are all set</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary rounded-md p-3 flex items-center justify-center">
                <FileQuestionIcon className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-muted-foreground">Ask your first question</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
