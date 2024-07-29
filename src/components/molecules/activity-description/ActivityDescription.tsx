interface Props {
  description: string;
}

export default function ActivityDescription({ description }: Props) {
  return (
    <section id="description">
      <div className="flex flex-col gap-[16px] px-[24px] py-[16px] md:border-t md:border-var-gray4 md:pb-[64px] md:pt-[40px]">
        <span className="text-20pxr font-[700]">체험 설명</span>
        <p className="whitespace-pre-line text-var-green-dark2">{description}</p>
      </div>
    </section>
  );
}
