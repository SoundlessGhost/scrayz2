import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="text-2xl font-bold text-foreground mb-2">
              Scrayz
            </div>
          </Link>
          <p className="text-muted-foreground">
            Professional data intelligence platform
          </p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/toc" className="text-neutral-900 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-neutral-900 hover:underline">
              Privacy Policy _
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
