import ProfileImage from '@/components/atoms/profile/ProfileImage';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="p-24 flex min-h-screen flex-col items-center justify-between">
      <ProfileImage src="data:image/jpeg;base64,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" />
      <div className="text-sm z-10 w-full max-w-5xl items-center justify-between font-mono lg:flex">
        <p className="left-0 top-0 pb-6 pt-8 lg:p-4 fixed flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="bottom-0 left-0 h-48 fixed flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="gap-2 p-8 lg:p-0 pointer-events-none flex place-items-center lg:pointer-events-auto"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 lg:mb-0 grid text-center lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="px-5 py-4 group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm max-w-[30ch] opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="px-5 py-4 group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{' '}
            <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm max-w-[30ch] opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="px-5 py-4 group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{' '}
            <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm max-w-[30ch] opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="px-5 py-4 group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{' '}
            <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm max-w-[30ch] text-balance opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
