import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "~/server/api/root";

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

console.log(domainUrl);

const url = `${domainUrl}/api/trpc`;

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
    }),
  ],
  transformer: superjson,
});
