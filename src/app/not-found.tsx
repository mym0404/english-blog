import { FlyingAlphabets } from "@/components/FlyingAlphabets";
import { NotFoundActions } from "@/components/NotFoundActions";

const NotFoundPage = () => {
  return (
    <div
      className={
        "relative flex flex-col justify-center items-center flex-1 gap-6 p-8 text-center"
      }
    >
      <div
        className={
          "z-10 space-y-4 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
        }
        style={{ animationDelay: "2.5s" }}
      >
        <p className={"text-white/70 text-sm tracking-[0.3em]"}>404</p>
        <h1 className={"text-white text-3xl font-bold drop-shadow-lg"}>
          Page Not Found
        </h1>
        <p className={"text-white/70 text-base drop-shadow-md"}>
          Please check the URL and try again.
        </p>
      </div>
      <div
        className={"animate-fade-in opacity-0 [animation-fill-mode:forwards]"}
        style={{ animationDelay: "3s" }}
      >
        <NotFoundActions />
      </div>
      <FlyingAlphabets />
    </div>
  );
};

export default NotFoundPage;
