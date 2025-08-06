import { z } from 'zod';

export const searchQuerySchema = z.object({
  query: z.string({ error: "The 'query' parameter is mandatory." }).min(1),

  page: z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(100).default(10),
});
