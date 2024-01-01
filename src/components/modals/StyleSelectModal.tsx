import { Button, Modal } from "antd";
import { useState } from "react";

interface StyleSelectModalProps {
  handleStepMoving: ({
    goTo,
    move,
  }: {
    move?: 0 | 1 | -1 | undefined;
    goTo?: number | undefined;
  }) => void;
}

export default function StyleSelectModal({
  handleStepMoving,
}: StyleSelectModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleStepMoving({ goTo: 1 });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="신년 카드 메이커🕺"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <p>안녕하세요😄</p>
        <hr />
        <p>🌟 2024년 신년 카드 메이커에 오신 것을 환영합니다 </p>
        <p>🎨 2가지 단계로 간단하게 카드를 만들고 공유해 보세요</p>
        <br />
        <p>1. 선택한 키워드에 맞춰 OpenAI의 DALL-E 3가 이미지를 생성한다 🖼️</p>
        <p>2. 랜덤 메시지 혹은 직접 메시지를 작성한다</p>
        <br />
        <p>생성된 카드는 저장하거나 친구들과 공유할 수 있어요! 💾📤</p>
        <p>이제 시작해볼까요? ✨</p>
      </Modal>

      <Button type="primary" onClick={showModal} className="w-full">
        시작하기
      </Button>
    </>
  );
}
