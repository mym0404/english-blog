import { HomeLayout } from "fumadocs-ui/layouts/home";
import { MilestoneIcon, NotepadTextIcon } from "lucide-react";

import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          icon: <NotepadTextIcon />,
          text: "Study Note",
          url: "/docs",
          active: "nested-url",
        },
        {
          icon: <MilestoneIcon />,
          text: "Blog",
          url: "/blog",
          active: "nested-url",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
