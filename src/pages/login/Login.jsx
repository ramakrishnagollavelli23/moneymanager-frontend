import { useContext, useState } from "react";
import { asserts } from "../../assets/asserts";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { LoaderCircle } from "lucide-react";
import AxiosConfig from "../../utils/AxiosConfig";
import { API_ENDPOINTS } from "../../utils/ApiEndpoints";
import ContextStore from "../../context/ContextStore";
import toast from "react-hot-toast";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(ContextStore)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email) {
      setError("Enter valid email address")
      setIsLoading(false)
      return
    }

    if (!password) {
      setError("Enter your password")
      setIsLoading(false)
      return
    }
    setError("")

    // For login API call
    try {
      const result = await AxiosConfig.post(API_ENDPOINTS.LOGIN, {
        email, password
      })

      const { token, user } = result.data

      if (token) {
        localStorage.setItem("token", token)
        setUser(user)
        navigate('/dashboard')
        toast.success("Login successfull")
      }
    } catch (error) {
      if (error.status === 403) setError(error.response.data.Message)
      else {
        console.error("Something went wrong" + error)
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="w-full h-screen relative flex justify-center items-center overflow-hidden">
      <img src={asserts.bg_Img} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">Welcome Back</h3>
          <p className="text-sm text-center text-slate-700 mb-8">Please enter your details to login</p>
          <form onSubmit={e => handleSubmitForm(e)} className="space-y-4">
            <div className="flex justify-center mb-6">
              {/* Profile Image */}
            </div>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email Address"}
              placeholder={"name@example.com"}
              type={"email"}
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
              placeholder={"********"}
              type={"password"}
            />

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 rounded p-2">
                {error}
              </p>
            )}

            <button disabled={isLoading} className={`btn-primary rounded w-full py-2 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`} type="submit">
              {
                isLoading ? <> <LoaderCircle className="animate-spin w-5 h-5" /> LOGIN... </>
                  : <>LOGIN</>
              }
            </button>

            <p className="text-sm text-center text-slate-800 mt-6">
              Don't have an account?
              <Link to={"/signup"} className="font-medium text-primary underline hover:text-primary-dark transition-colors">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login