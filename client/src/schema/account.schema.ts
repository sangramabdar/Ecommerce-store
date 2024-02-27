import { z } from "zod";

export const updateFormSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
});

export type UpdateFormSchema = z.infer<typeof updateFormSchema>;
