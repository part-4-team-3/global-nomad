interface Props {
  description: string;
}

export default function ActivityDescription({ description }: Props) {
  return (
    <div className="flex flex-col gap-[16px] px-[24px] py-[16px]">
      <span className="text-20pxr font-[700]">체험 설명</span>
      <p className="text-var-green-dark2">{description}</p>
    </div>
  );
}
