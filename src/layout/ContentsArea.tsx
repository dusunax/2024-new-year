"use client";
import { PropsWithChildren } from "react";

interface ContentWidthProps extends PropsWithChildren {
  className?: string;
}

export default function ContentsArea({
  children,
  className = "",
}: ContentWidthProps) {
  return <div className={`w-full px-6 ${className}`}>{children}</div>;
}
