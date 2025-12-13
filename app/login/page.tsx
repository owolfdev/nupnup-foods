import LoginForm from "../components/LoginForm";
import { getAuthKeys } from "@/lib/authKeys";

export default function LoginPage() {
  const { partnerKeys, adminKeys } = getAuthKeys();

  return (
    <div className="w-full px-4 md:px-8 py-16 md:py-20 flex-1 flex">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-10 space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Secure Access
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Log in for partner or admin tools
          </h1>
          <p className="text-gray-600">
            Use a partner key to unlock brand assets. Use an admin key to see
            both admin and partner links in the footer and access admin docs.
          </p>
        </div>

        <LoginForm partnerKeys={partnerKeys} adminKeys={adminKeys} />

        <p className="text-xs text-center text-gray-500">
          Lost your key? Please reach out to your Nup Nup contact to request a
          new one.
        </p>
      </div>
    </div>
  );
}
