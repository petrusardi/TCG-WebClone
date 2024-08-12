import { User } from "@/database/models/user.model";
import { comparePassword } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

export type PageProps = {
  params: {};
  searchParams: { ok: "false" | "true"; message: string };
};

export default function Page({ params, searchParams }: PageProps) {
  const login = async (formData: FormData) => {
    "use server";
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const loginSchema = z.object({
      email: z
        .string({ message: "email required" }).min(1, "Email required")
        .email({ message: "Invalid email format" }),
      password: z.string({ message: "password required" }).min(6, "Password required"),
    });

    const { error, data } = await loginSchema.safeParseAsync(body);
    if (error) {
      redirect("/login?ok=false&message=" + error.errors[0].message);
    }

    const user = await User.findByEmail(data.email);
    if (!user) {
      redirect("/login?ok=false&message=Invalid email/password");
    }

    const isPasswordValid = comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      redirect("/login?ok=false&message=Invalid email/password");
    }

    const access_token = signToken({ _id: user._id });

    const cookieStore = cookies();

    cookieStore.set({
      name: "Authorization",
      value: `Bearer ${access_token}`,
      httpOnly: true,
      path: "/"
    })
    
    redirect("/products")
  };
  
  return (
    <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/cropped-TCG-Logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        {searchParams.ok === "false" && (
          <h5 className="text-red-500 text-xl text-center">
            {searchParams.message}
          </h5>
        )}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={login}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
        <Link
          href="/register"
          className="flex w-full justify-center mt-5 rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}
