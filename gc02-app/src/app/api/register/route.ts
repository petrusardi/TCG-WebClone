import { User } from "@/database/models/user.model";
import { hashPass } from "@/helpers/bcrypt";
import { z, ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userSchema = z.object({
      name: z.string({ message: "Name required" }).min(1,"Name required"),
      username: z.string({ message: "Username required" }).min(1, "Username required"),
      email: z
        .string({ message: "Email required" })
        .min(1, "Email required")
        .email("Invalid email format"),
      password: z.string({ message: "Password required" }).min(6, "Password required"),
    });

    const result = await userSchema.parseAsync(body);
    result.password = hashPass(result.password);

    await User.create(result);

    return Response.json({ message: "Register Success" }, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json({ message: err.errors[0].message }, { status: 400 });
    } else {
      return Response.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
