import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Card, Button } from "antd";
import { Message } from "@/interface/card";

interface GeneratedResultCardProps {
  generatedImage: string;
  onDownloadImage: () => void;
  imageRef: RefObject<HTMLDivElement>;
  message: Message;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleStepMoving: ({
    goTo,
    move,
  }: {
    move?: 0 | 1 | -1 | undefined;
    goTo?: number | undefined;
  }) => void;
}

export default function GeneratedResultCard({
  generatedImage,
  onDownloadImage,
  imageRef,
  message,
  loading,
  setLoading,
  handleStepMoving,
}: GeneratedResultCardProps) {
  const [loadedImage, setLoadedImage] = useState("");

  useEffect(() => {
    if (generatedImage) {
      // crossOrigin 이슈 해결을 위해 Next.js API 라우트를 통해 이미지를 요청합니다
      fetch(`/api/proxy?url=${encodeURIComponent(generatedImage)}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setLoadedImage(url);
          setLoading(false);
        })
        .catch((error) => console.error("Error loading image:", error))
        .finally(() => handleStepMoving({ goTo: 2 }));
    }
  }, [generatedImage]);

  return (
    <Card title="완성 카드" className="w-full">
      <div
        ref={imageRef}
        className={`h-[300px] flex items-center justify-center mb-4 bg-primary-100 shadow-md hover:shadow-xl rounded-md relative ${
          loading ? "animate-pulse" : ""
        }`}
      >
        {loadedImage && (
          <img
            src={loadedImage}
            alt="Generated Card"
            className="absolute w-full h-full object-contain left-0 top-0"
            crossOrigin="anonymous"
          />
        )}

        {!loadedImage && (
          <p className="text-xs opacity-40">이미지를 생성해주세요</p>
        )}

        {message.text && <MessageTextBox message={message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className="transition"
          type={loadedImage ? "primary" : "default"}
          onClick={onDownloadImage}
        >
          저장
        </Button>
      </div>
    </Card>
  );
}

const MessageTextBox = ({ message }: { message: Message }) => {
  return (
    <div
      className="flex flex-col gap-1 w-3/4 bg-primary px-4 py-2 absolute text-white bottom-4 left-1/2 -translate-x-1/2  rounded-lg text-xs break-keep"
      style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
    >
      <p className="font-semibold">{message.to && message.to}</p>

      <p>{message.text}</p>

      <p className="font-semibold text-right">{message.from}</p>
    </div>
  );
};
