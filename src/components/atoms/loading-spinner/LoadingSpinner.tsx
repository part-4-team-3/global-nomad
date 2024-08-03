export default function LoadingSpinner() {
  const style = 'size-10pxr animate-loading rounded-full bg-var-black';
  return (
    <div className="space-x-2 flex items-center justify-center gap-[10px]">
      <div className={style}></div>
      <div className={`delay-100 ${style}`}></div>
      <div className={`delay-200 ${style}`}></div>
    </div>
  );
}
