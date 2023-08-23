import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "~/server/api/root";
import * as process from "process";

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

console.log(vercelUrl);

const url = vercelUrl
  ? `https://${vercelUrl}/api/trpc`
  : `http://localhost:3000/api/trpc`;

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
    }),
  ],
  transformer: superjson,
});
