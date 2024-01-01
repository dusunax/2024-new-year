import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col gap-8 items-center">
      <Link href={"/card"}>
        <Button type="primary">카드 만들기</Button>
      </Link>
    </div>
  );
}
