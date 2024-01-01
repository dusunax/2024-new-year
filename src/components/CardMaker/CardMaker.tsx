"use client";
import { useEffect, useRef } from "react";

import StyleSelectModal from "../modals/StyleSelectModal";
import StyleSelectCard from "./StyleSelectCard";
import MessageInputCard from "./MessageInputCard";
import ImageGenerateCard from "./ImageGenerateCard";
import GeneratedResultCard from "./GeneratedResultCard";

import useCardMaker from "./hooks/useCardMaker";
import { Button } from "antd";

export default function CardMaker() {
  const imageRef = useRef<HTMLDivElement>(null);
  const {
    step,
    handleStepMoving,
    selectedStyles,
    generatedImage,
    loading,
    setLoading,
    message,
    setMessage,
    handleGenerateImage,
    handleDownloadImage,
    handleStyleSelect,
    linkCopy,
  } = useCardMaker({ imageRef });

  useEffect(() => {
    const section = document.getElementById(`step${step}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  return (
    <>
      <section id="step0" className="w-full h-screen">
        <div className="max-w-[360px] h-full mx-auto flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl mb-10">신년 카드 메이커</h1>

          <div className="w-2/3 flex flex-col gap-2">
            <StyleSelectModal handleStepMoving={handleStepMoving} />
            <Button type="default" onClick={linkCopy} className="w-full">
              링크 공유하기
            </Button>
          </div>
        </div>
      </section>

      <section
        id="step1"
        className="w-full h-screen max-w-[360px] mx-auto flex flex-col gap-2"
      >
        <div className="max-w-[360px] h-full mx-auto flex flex-col justify-center items-center gap-2">
          <StyleSelectCard
            selectedStyles={selectedStyles}
            handleStyleSelect={handleStyleSelect}
          />
          <ImageGenerateCard
            loading={loading}
            selectedStyles={selectedStyles}
            onImageGenerate={handleGenerateImage}
          />
        </div>
      </section>

      <section
        id="step2"
        className="w-full h-screen max-w-[360px] mx-auto flex flex-col gap-2"
      >
        <MessageInputCard message={message} setMessage={setMessage} />
        <GeneratedResultCard
          imageRef={imageRef}
          message={message}
          generatedImage={generatedImage}
          onDownloadImage={handleDownloadImage}
          loading={loading}
          setLoading={setLoading}
          handleStepMoving={handleStepMoving}
        />
      </section>
    </>
  );
}
