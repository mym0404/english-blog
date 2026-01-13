"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const baseClassName =
  "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/20";

type ActionButtonProps = {
  children: ReactNode;
  className?: string;
} & (
  | {
      href: string;
      onClick?: never;
      type?: never;
    }
  | {
      href?: never;
      onClick: () => void;
      type?: "button" | "submit" | "reset";
    }
);

const ActionButton = ({
  children,
  className,
  href,
  onClick,
  type,
}: ActionButtonProps) => {
  const mergedClassName = [baseClassName, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={mergedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={mergedClassName}
    >
      {children}
    </button>
  );
};

export { ActionButton };
