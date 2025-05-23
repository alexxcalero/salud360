import { useEffect } from "react"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-left ">INICIAR SESIÓN</h1>
        <LoginForm />
      </div>
    </div>
  )
}
