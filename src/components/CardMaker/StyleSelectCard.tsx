import { useTranslation } from "react-i18next";
import { Card, Button } from "antd";

import { CARD_STYLES } from "@/constant/cardMessages";
import { StyleSelect } from "@/interface/card";

interface StyleSelectCardProps {
  selectedStyles: Set<StyleSelect>;
  handleStyleSelect: (style: StyleSelect) => void;
}

export default function StyleSelectCard({
  selectedStyles,
  handleStyleSelect,
}: StyleSelectCardProps) {
  // const { t } = useTranslation();

  return (
    // <Card title={t("cardStyles.cardStyleSelection")} className="w-full">
    <Card title="스타일 선택 👩‍🎨" className="w-full">
      <div className="flex flex-col gap-2">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {CARD_STYLES.map((style) => (
            <Button
              key={style.ko}
              type={selectedStyles.has(style) ? "primary" : "default"}
              size="small"
              style={{ margin: "4px", fontSize: "x-small" }}
              onClick={() => handleStyleSelect(style)}
            >
              {style.ko}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
