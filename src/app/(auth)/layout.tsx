export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh w-full items-start justify-center">
      <div className="mx-12pxr mt-44pxr flex w-350pxr flex-col items-center justify-start gap-24pxr md:mt-72pxr md:w-640pxr md:gap-32pxr lg:mt-104pxr">
        {children}
      </div>
    </div>
  );
}
