import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from "@/services/authService"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    // Aquí puedes hacer una petición con Axios al backend
    try {
      const response = await login(formData.correo, formData.contraseña);

      // Guardar resultado si es token
      localStorage.setItem("authToken", response);

      // Redirigir al perfil del usuario
      navigate("/usuario"); //pagina de inicio del usuario
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Correo o contraseña incorrectos.");
      } else {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error inesperado.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div>
          <label className="text-left block text-sm">
            Correo electrónico <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            name="correo"
            type="email"
            placeholder="fabian@pucp.edu.pe"
            value={formData.correo}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <label className="text-left block text-sm">
            Contraseña <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            name="contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <div className="text-sm">
        ¿No tienes una cuenta?{" "}
        <Link to="/RegistroUsuario" className="text-[#1E88E5] hover:underline">
          Regístrate aquí
        </Link>
      </div>
      <Button type="submit" className="w-full py-3 px-4 bg-[#1E88E5] text-white rounded-md hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:ring-opacity-50 cursor-pointer">
        Iniciar Sesión
      </Button>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:ring-opacity-50 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        Iniciar sesión con Google
      </button>
    </form>
  )
}
