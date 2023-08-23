import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import type { TRPCError } from "@trpc/server";

import { trpcClient } from "~/api/trpcClient";
import { FibonacciForm } from "~/components/FibonacciForm";
import { Loader } from "~/components/Loader";

export default function Home() {
  const [result, setResult] = useState<{
    inputValue: number;
    result: bigint;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (n: number) => {
    setIsLoading(true);
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
      })
      .catch(() => {
        toast.error("Unknown error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Fibonacci Computer</title>
        <meta name="description" content="Computes fibonacci numbers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center gap-[8rem] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container mt-[10%] flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-slate-100 sm:text-[5rem]">
            Fibonacci <span className="text-[hsl(280,100%,70%)]">Computer</span>
          </h1>

          <FibonacciForm handleSubmit={handleSubmit} />
        </div>
        <div
          className={
            "container flex flex-1 flex-col items-center justify-center"
          }
        >
          <div
            className={
              "flex items-center justify-center border-1 mb-32 min-w-[80%] max-w-[768px] flex-1 rounded-md border-2 border-solid border-slate-100 px-12 py-6 text-center text-slate-100"
            }
          >
            {isLoading && <Loader />}
            {!isLoading && !result && <p className={"text-4xl"}>?</p>}
            {!isLoading && result && (
              <p
                className={"break-all"}
                title={
                  result
                    ? `Fibonacci number for input value: ${result.inputValue}`
                    : undefined
                }
              >
                {result.result.toString()}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
