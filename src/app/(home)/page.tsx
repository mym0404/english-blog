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
  return (
    <div
      className={
        "relative flex flex-col justify-center items-center flex-1 gap-8 p-8"
      }
    >
      <div className={"z-10 w-full max-w-2xl"}>
        <TerminalDisplay lines={terminalLines} />
      </div>

      <div className={"text-center z-10"}>
        <h1 className={"text-3xl font-bold mb-4  drop-shadow-lg"}>
          나의 영어여행
        </h1>
        <p className={"text-fd-foreground/70 text-lg drop-shadow-md"}>
          나만의 작은 영어 학습 블로그
        </p>
      </div>
      <FlyingAlphabets />
    </div>
  );
};

export default HomePage;
