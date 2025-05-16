import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-xl p-10 bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <h1 className="text-4xl font-bold text-left mb-8">INICIAR SESIÓN</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
