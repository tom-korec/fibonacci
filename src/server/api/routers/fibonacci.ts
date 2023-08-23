import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fibonacci } from "~/utils/fibonacci";

export const fibonacciRouter = createTRPCRouter({
  compute: publicProcedure
    .input(
      z.object({
        n: z.number().gte(0, "Parameter N must be greater or equal than 0"),
      })
    )
    .query(({ input }) => {
      return {
        result: fibonacci(input.n),
      };
    }),
});
