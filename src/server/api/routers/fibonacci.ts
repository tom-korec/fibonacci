import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fibonacci } from "~/utils/fibonacci";
import { fibonacciInputNumberSchema } from "~/validation";

export const fibonacciRouter = createTRPCRouter({
  compute: publicProcedure
    .input(
      z.object({
        n: fibonacciInputNumberSchema,
      })
    )
    .query(({ input }) => {
      return {
        result: fibonacci(input.n),
      };
    }),
});
