import { API_ENDPOINTS } from "./ApiEndpoints"

const CLOUDINARY_UPLOAD_PRESENT = "moneymanager"

const UploadProfileImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESENT)

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_PROFILE_IMG, {
            method: "POST",
            body: formData
        })

        if (!response.ok) throw new Error(`Cloudinary upload failed`)

        const data = await response.json()
        return data.secure_url;
    } catch (err) {
        console.error("Error uploading the image ", err)
        throw err;
    }
}

export default UploadProfileImage