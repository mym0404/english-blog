import { ActionButton } from "@/components/ActionButton";
import { FlyingAlphabets } from "@/components/FlyingAlphabets";
import { TerminalDisplay } from "@/components/Terminal";

const terminalLines = [
  "\x1b[1;36m> I have to study English desperately.\x1b[0m",
  "",
  "\x1b[33mThinking in English...\x1b[0m",
  "  - Grammar fundamentals... \x1b[32mOK\x1b[0m",
  "  - Vocabulary builder... \x1b[32mOK\x1b[0m",
  "  - Pronunciation guide... \x1b[32mOK\x1b[0m",
  "",
  "\x1b[1;35mReady to learn!\x1b[0m",
];

const HomePage = () => {
  const primaryLinks = [
    { label: "Grammar", href: "/docs" },
    { label: "Listening", href: "/docs/listening" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div
      className={
        "relative flex flex-col justify-center items-center flex-1 gap-8 p-8"
      }
    >
      <div
        className={
          "z-10 w-full max-w-2xl animate-fade-in opacity-0 [animation-fill-mode:forwards]"
        }
        style={{ animationDelay: "2s" }}
      >
        <TerminalDisplay lines={terminalLines} />
      </div>

      <div
        className={
          "text-center z-10 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
        }
        style={{ animationDelay: "2.5s" }}
      >
        <h1 className={"text-white text-3xl font-bold mb-4  drop-shadow-lg"}>
          나의 영어여행
        </h1>
        <p className={"text-white/70 text-lg drop-shadow-md"}>
          나만의 작은 영어 학습 블로그
        </p>
      </div>
      <div
        className={
          "z-10 flex flex-wrap justify-center gap-2 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
        }
        style={{ animationDelay: "3s" }}
      >
        {primaryLinks.map((link) => (
          <ActionButton key={link.label} href={link.href}>
            {link.label}
          </ActionButton>
        ))}
      </div>
      <FlyingAlphabets />
    </div>
  );
};

export default HomePage;
