"use client";

import { useRouter } from "next/navigation";

import { ActionButton } from "@/components/ActionButton";

const NotFoundActions = () => {
  const router = useRouter();

  return (
    <div className={"z-10 flex flex-wrap justify-center gap-3"}>
      <ActionButton onClick={() => router.back()}>Go Back</ActionButton>
      <ActionButton href={"/"}>Go Home</ActionButton>
    </div>
  );
};

export { NotFoundActions };
