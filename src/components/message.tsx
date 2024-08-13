import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { BrainCircuit, User } from "lucide-react";
import { Separator } from "./ui/separator";

export const Message = ({
  content,
  isUserMessage,
  timeStamp,
  isLoading,
}: {
  content: string;
  isUserMessage: boolean;
  timeStamp?: Date;
  isLoading: boolean;
}) => {
  return (
    <div
      className={cn("flex w-11/12 mx-auto pt-10 ", {
        "justify-end": isUserMessage,
        "justify-start": !isUserMessage,
      })}
    >
      <div className="max-w-2xl flex items-start gap-2.5">
        <div
          className={cn(
            "size-10 shrink-0 aspect-square rounded-full border border-foreground/70 flex justify-center items-center",
            {
              "border-primary/70": isUserMessage,
            }
          )}
        >
          {isUserMessage ? <User size={16} /> : <BrainCircuit size={16} />}
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <div className="px-6 py-2 rounded-2xl bg-foreground/10 animate-pulse w-48 h-8"></div>
          ) : (
            <p
              className={cn("px-6 py-2 rounded-2xl text-sm", {
                "bg-primary text-background": isUserMessage,
                "bg-foreground/80 text-background": !isUserMessage,
              })}
            >
              {content}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm opacity-70">
            <span>{isUserMessage ? "You" : "Website"}</span>
            <Separator
              orientation="vertical"
              className="h-3 bg-foreground/70"
            />
            <span>{timeStamp && formatDate(timeStamp, "HH:mm")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
