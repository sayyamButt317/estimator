import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
