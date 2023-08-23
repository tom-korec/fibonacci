import Head from "next/head";
import { useState } from "react";
import type { TRPCError } from "@trpc/server";

import { trpcClient } from "~/api/trpcClient";
import { FibonacciForm } from "~/components/FibonacciForm";

export default function Home() {
  const [result, setResult] = useState<bigint | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (n: number) => {
    trpcClient.fibonacci.compute
      .query({ n })
      .then((result) => {
        setResult(result.result);
      })
      .catch((error: TRPCError) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <>
      <Head>
        <title>Fibonacci Computer</title>
        <meta name="description" content="Computes fibonacci numbers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-100 sm:text-[5rem]">
            Fibonacci <span className="text-[hsl(280,100%,70%)]">Computer</span>
          </h1>

          <FibonacciForm handleSubmit={handleSubmit} />

          {result !== null && <p>{result.toString()}</p>}
        </div>
      </main>
    </>
  );
}
