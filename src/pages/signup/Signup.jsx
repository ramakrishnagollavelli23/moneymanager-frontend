import { useState } from "react"
import { asserts } from "../../assets/asserts";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { ValidateEmail } from "../../utils/ValidateEmail";
import AxiosConfig from "../../utils/AxiosConfig";
import { API_ENDPOINTS } from "../../utils/ApiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSeletor from "../../components/ProfilePhotoSeletor";
import UploadProfileImage from "../../utils/UploadProfileImage";

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        let profileImgUrl = null;
        setIsLoading(true)

        if (!fullName.trim()) {
            setError("Please enter your name")
            setIsLoading(false)
            return;
        }

        if (!ValidateEmail(email)) {
            setError("Please enter your email")
            setIsLoading(false)
            return
        }

        if (!password.trim()) {
            setError("Please enter your password")
            setIsLoading(false)
            return
        }
        setError(null)

        // For signup API call
        try {

            // For upload the image if present
            if (profilePhoto) {
                const imageUrl = await UploadProfileImage(profilePhoto)
                profileImgUrl = imageUrl ? imageUrl : "";
            }

            const result = await AxiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName, email, password, profileImgUrl
            })
            if (result) {
                toast.success("Profile created successfully...")
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="w-full h-screen relative flex justify-center items-center overflow-hidden">
            <img src={asserts.bg_Img} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">Create an account</h3>
                    <p className="text-sm text-center text-slate-700 mb-8">Start tracking your spendings by joining with us</p>
                    <form onSubmit={e => handleSubmitForm(e)} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSeletor image={profilePhoto} setImage={setProfilePhoto} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label={"Full Name"}
                                placeholder={"Jhon Doe"}
                                type={"text"}
                            />
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label={"Email Address"}
                                placeholder={"name@example.com"}
                                type={"email"}
                            />
                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label={"Password"}
                                    placeholder={"********"}
                                    type={"password"}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-800 font-semibold text-sm text-center bg-red-300 rounded p-2">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`btn-primary rounded w-full py-2 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`} type="submit">
                            {isLoading ?
                                <><LoaderCircle className="animate-spin w-5 h-5" />REGISTER...</>
                                : <>REGISTER</>
                            }
                        </button>

                        <p className="text-sm text-center text-slate-800 mt-6">
                            Already have an account?
                            <Link to={"/login"} className="font-medium text-primary underline hover:text-primary-dark transition-colors">   Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup