import { z } from 'zod';

export const lightHouseResultSchema = z.object({
  json: z.string(),
  html: z.string(),
  performanceScore: z.number().min(0).max(100),
  firstContentfulPaint: z.number(),
  largestContentfulPaint: z.number(),
  totalBlockingTime: z.number(),
  cumulativeLayoutShift: z.number(),
  speedIndex: z.number(),
});

export type LightHouseResult = z.infer<typeof lightHouseResultSchema>;
