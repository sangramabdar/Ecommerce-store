import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "invalid email",
  }),
  password: z.string().min(8, {
    message: "password must contain between 8 to 20 characters",
  }),
});

type Login = z.infer<typeof loginSchema>;

async function parser() {
  try {
    const data = await loginSchema.parseAsync({
      email: "abdarsangram@gmail.com",
      password: "232sd",
      name: "sangram",
    });
    console.log(data);
  } catch (error) {
    console.log(error.errors);
  }
}

parser();
