import { RefObject, useState } from "react";
import { OpenAI } from "openai";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { notification } from "antd";

import { OPENAI_API_KEY } from "@/config/environment";
import { StyleSelect } from "@/interface/card";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface UseCardMaker {
  imageRef: RefObject<HTMLDivElement>;
}

export default function useCardMaker({ imageRef }: UseCardMaker) {
  const [step, setStep] = useState<number>(0);
  const MAX_STEP = 2;
  const [loading, setLoading] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<Set<StyleSelect>>(
    new Set()
  );
  const [generatedImage, setGeneratedImage] = useState("");
  const [message, setMessage] = useState({
    to: "",
    from: "",
    text: "",
  });

  const handleStepMoving = ({
    goTo,
    move,
  }: {
    move?: 0 | 1 | -1;
    goTo?: number;
  }) => {
    if (goTo && goTo <= MAX_STEP) {
      setStep(goTo);
    }

    if (move) {
      const newStep = step + move;
      if (newStep < 0) setStep(0);
      if (newStep > MAX_STEP) setStep(MAX_STEP);

      setStep(newStep);
    }
  };

  // Select Styles
  const handleStyleSelect = (style: StyleSelect) => {
    const updatedStyles = new Set(selectedStyles);
    if (updatedStyles.has(style)) {
      updatedStyles.delete(style);
    } else {
      updatedStyles.add(style);
    }

    if (updatedStyles.size <= 5) {
      setSelectedStyles(updatedStyles);
    } else {
      notification.info({
        message: "스타일 선택하기",
        description:
          "5개 이상의 스타일을 선택할 수 없습니다. 5개 이하의 스타일을 선택해주세요.",
        closeIcon: null,
        duration: 2,
      });
    }
  };

  // Generated Images
  const handleGenerateImage = async (styles: Set<StyleSelect>) => {
    if (selectedStyles.size === 0) {
      notification.info({
        message: "스타일 선택하기",
        description: "하나 이상의 스타일을 선택해주세요🤔",
        closeIcon: null,
        duration: 2,
      });
      return;
    }

    setLoading(true);

    try {
      const prompt = `2024 new years, text "2024", a asian dragon, confetti, ${Array.from(
        selectedStyles
      ).map((e) => e.en)}`;

      notification.info({
        message: "잠시만 기다려주세요🥰",
        closeIcon: null,
        duration: 2,
      });

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        quality: "standard",
      });

      const imageUrl = response.data[0].url;
      setGeneratedImage(imageUrl ?? "");
    } catch (e) {
      console.log(e);
    }
  };

  // Image Download
  const handleDownloadImage = () => {
    try {
      if (imageRef.current && generatedImage) {
        html2canvas(imageRef.current).then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) saveAs(blob, "2024-new-year-message.png");
          });
        });
      }
      notification.info({
        message: "카드가 저장 되었습니다",
        closeIcon: null,
        duration: 2,
      });
    } catch (err) {
      console.log(err);

      notification.error({
        message: "카드 저장에 실패헀습니다",
        closeIcon: null,
        duration: 2,
      });
    }
  };

  const linkCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        notification.info({
          message: "링크가 복사되었습니다",
          closeIcon: null,
          duration: 2,
        });
      })
      .catch((err) => {
        console.error(err);

        notification.error({
          message: "링크 복사에 실패헀습니다",
          closeIcon: null,
          duration: 2,
        });
      });
  };

  return {
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
  };
}
