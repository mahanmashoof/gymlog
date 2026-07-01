import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <AuthForm mode="register" />
    </div>
  );
}
