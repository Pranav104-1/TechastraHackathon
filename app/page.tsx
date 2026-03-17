import AIChatbot from "@/components/aichatbot";
import { SignInButton, UserAvatar } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <SignInButton />
        <UserAvatar />
        <AIChatbot/>
      </main>
    </div>
  );
}
