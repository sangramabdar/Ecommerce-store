import { z } from "zod";

const updateProfileSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
});

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export { UpdateProfileSchema, updateProfileSchema };
