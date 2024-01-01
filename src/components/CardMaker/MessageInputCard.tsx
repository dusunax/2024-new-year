import React, { Dispatch, SetStateAction, useState } from "react";
import { Card, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

import { getRandomMessage } from "@/constant/cardMessages";
import { Message } from "@/interface/card";

interface CardMessageInputProps {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

export default function CardMessageInput({
  message,
  setMessage,
}: CardMessageInputProps) {
  // const { t } = useTranslation();
  const [onRandom, setOnRandom] = useState(false);

  const handleMessageChange = (newMessage: Message) => {
    setOnRandom(false);
    setMessage(newMessage);
  };

  const handleRandomMessage = () => {
    setOnRandom(true);
    const randomMessage = getRandomMessage();
    setMessage({ ...message, text: randomMessage.ko }); // 한글 메시지!
  };

  return (
    // <Card title={t("cardMessageInput.cardMessage")} className="w-full">
    <Card title="" className="w-full">
      <form action="" className="flex flex-col gap-2">
        <Input
          placeholder="(선택)메시지 받을 사람"
          onChange={(e) =>
            handleMessageChange({ ...message, to: e.target.value })
          }
        />
        <Input
          placeholder="(선택)메시지 보내는 사람"
          onChange={(e) =>
            handleMessageChange({ ...message, from: e.target.value })
          }
        />
        <Input.TextArea
          value={message.text}
          onChange={(e) =>
            handleMessageChange({ ...message, text: e.target.value })
          }
          placeholder="메시지"
          className={`${onRandom ? "bg-primary-100" : ""}`}
          rows={4}
        />
        <Button type="default" onClick={handleRandomMessage}>
          랜덤 신년 메시지 🎲
          {/* {t("cardMessageInput.randomMessageButton")} */}
        </Button>
      </form>
    </Card>
  );
}
