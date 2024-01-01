import React from "react";
import { Card, Button } from "antd";
import { StyleSelect } from "@/interface/card";

interface CardImageGeneratorProps {
  loading: boolean;
  selectedStyles: Set<StyleSelect>;
  onImageGenerate: (styles: Set<StyleSelect>) => void;
}

export default function CardImageGenerator({
  loading,
  selectedStyles,
  onImageGenerate,
}: CardImageGeneratorProps) {
  return (
    <Card title="카드 이미지 생성 🎨" className="w-full">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex min-h-10 flex-wrap justify-center">
          {Array.from(selectedStyles).map((style) => (
            <Button
              key={style.en}
              type="primary"
              style={{ margin: "4px", fontSize: "xx-small" }}
              size="small"
              className={`pointer-events-none ${
                loading ? "animate-pulse" : ""
              }`}
            >
              {style.ko}
            </Button>
          ))}
          {selectedStyles.size === 0 ? "?" : ""}
        </div>
        <Button
          className={loading ? "animate-pulse" : ""}
          type={selectedStyles.size === 0 ? "default" : "primary"}
          onClick={() => {
            onImageGenerate(selectedStyles);
          }}
        >
          이미지 생성
        </Button>
      </div>
    </Card>
  );
}
