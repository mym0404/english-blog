import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { HeadsetIcon, NotepadTextIcon } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "나의 영어여행",
      transparentMode: "always",
    },
    links: [
      {
        icon: <NotepadTextIcon />,
        text: "정리노트",
        url: "/docs",
        active: "nested-url",
      },
      {
        icon: <HeadsetIcon />,
        text: "블로그",
        url: "/blog",
        active: "nested-url",
      },
    ],
  };
}
