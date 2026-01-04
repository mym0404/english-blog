import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className={"flex items-center gap-1"}>
          <Image
            src={"/images/icon1024.png"}
            alt={"logo"}
            width={32}
            height={32}
          />
          <div className={"space-x-1"}>
            <span className={"text-xs opacity-50"}>나의</span>
            <span>영어여행</span>
          </div>
        </div>
      ),
      transparentMode: "always",
    },
  };
}
