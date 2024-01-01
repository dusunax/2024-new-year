"use client";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import ContentsArea from "./ContentsArea";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

export default function Header({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header
      style={{ position: "sticky", background: "white", zIndex: 5, top: 0 }}
    >
      <ContentsArea className="flex gap-8 h-10 ">
        {pathname !== "/" && (
          <Button type="text" onClick={() => router.back()}>
            <LeftOutlined />
          </Button>
        )}
        {children}
      </ContentsArea>
    </header>
  );
}
