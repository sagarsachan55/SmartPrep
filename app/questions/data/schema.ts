import { z } from "zod";

export const questionSchema = z.object({
  // id: z.string(),
  // title: z.string(),
  // status: z.string(),
  // label: z.string(),
  // priority: z.string(),

  ID : z.number(),
  Acceptance : z.string(),
  Difficulty :  z.string(),
  Frequency : z.number(),
  LeetcodeQuestionLink : z.string(),
  Company : z.string(),
  Title : z.string(),

});

export type Task = z.infer<typeof questionSchema>;
