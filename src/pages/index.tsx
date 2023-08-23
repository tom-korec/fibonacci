import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import type { TRPCError } from "@trpc/server";

import { trpcClient } from "~/api/trpcClient";
import { FibonacciForm } from "~/components/FibonacciForm";

export default function Home() {
  const [result, setResult] = useState<{
    inputValue: number;
    result: bigint;
  } | null>(null);

  const handleSubmit = (n: number) => {
    trpcClient.fibonacci.compute
      .query({ n })
      .then((result) => {
        setResult({ inputValue: n, result: result.result });
      })
      .catch((error: { message?: string }) => {
        const parsedErrors = JSON.parse(error.message ?? "{}") as TRPCError[];
        console.log(parsedErrors);

        if (parsedErrors.length > 0) {
          toast.error(parsedErrors[0]?.message ?? "An error occurred");
        }
      });
  };

  return (
    <>
      <Head>
        <title>Fibonacci Computer</title>
        <meta name="description" content="Computes fibonacci numbers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col gap-[8rem] items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 mt-[10%] ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-slate-100 sm:text-[5rem]">
            Fibonacci <span className="text-[hsl(280,100%,70%)]">Computer</span>
          </h1>

          <FibonacciForm handleSubmit={handleSubmit} />
        </div>
        <div className={"container flex flex-col items-center"}>
          <p
            className={
              "border-1 w-1/2 break-words rounded-md border-2 border-solid border-slate-100 px-12 py-6 text-center text-slate-100"
            }
            title={
              result
                ? `Fibonacci number for input value: ${result.inputValue}`
                : undefined
            }
          >
            {result ? result.result.toString() : <span className={"text-8xl"}>?</span>}
          </p>
        </div>
      </main>
    </>
  );
}
