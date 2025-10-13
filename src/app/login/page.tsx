import { Suspense } from "react";
import LoginPage from "@/components/pages/login/page";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="relative">
        <LoginPage />
      </main>
    </Suspense>
  );
}
