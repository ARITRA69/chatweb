import Link from "next/link";
import { HeroUrlForm } from "@/components/hero-url-form";
import { GithubIcon, Mail, TwitterIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen w-full bg-gradient-to-tr from-purple-50 via-orange-50 to-sky-50">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
            Chat with any website
          </h1>
          <p className="max-w-[600px] md:text-xl">
            Enter the website URL you want to chat with.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <HeroUrlForm />
        </div>
        <div className="flex items-center gap-4">
          {/* <ModeToggle /> */}
          <Link
            href="https://github.com/ARITRA69/chatweb"
            className="hover:underline"
            prefetch={false}
          >
            <GithubIcon className="w-6 h-6" />
            <span className="sr-only">GitHub Repo</span>
          </Link>
          <Link
            href="https://x.com/aritra81999"
            className="hover:underline"
            prefetch={false}
          >
            <TwitterIcon className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="mailto:aritrasarkar2002@gmail.com"
            className="hover:underline"
            prefetch={false}
          >
            <Mail className="w-6 h-6" />
            <span className="sr-only">Mail</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
