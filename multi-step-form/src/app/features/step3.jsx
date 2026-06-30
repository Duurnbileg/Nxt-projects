import Input from "@/app/components/input";
import SecondBtn from "@/app/components/secondaryBtn";
import PrimaryBtn from "../components/primaryBtn";
import { useState } from "react";
import ImgInput from "../components/ImgInput";
import Image from "next/image";

export default function Step3({ handleFinish, handleBackStep, formData, setFormData }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [profilePictureError, setProfilePictureError] = useState("");

    const validateInput = () => {
        let isValid = true;

        if (formData.dateOfBirth.length == 0) {
            setDateOfBirthError("Төрсөн огноогоо оруулна уу");
            isValid = false;
        } else {
            setDateOfBirthError("");
        }

        if (!profilePicture) {
            setProfilePictureError("Профайл зураг оруулна уу");
            isValid = false;
        } else {
            setProfilePictureError("");
        }

        return isValid;
    };

    const handleImgUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setProfilePicture(URL.createObjectURL(file));
        setProfilePictureError("");
    };


    const handleButtonClick = () => {
        if (validateInput() == true) {
            handleFinish();
        }
    };

    return (
        <div className="bg-white h-[650px] w-[480px] rounded-xl p-8 gap-20 flex flex-col justify-between">
            <div className="bg-white rounded-xl flex flex-col gap-7 h-full">
                <div className="flex flex-col gap-1">
                    <Image src="/logo.svg" alt="Logo" width={60} height={60} />
                    <h1 className="text-black text-[26px] font-semibold">Join Us! 😎</h1>
                    <p className="text-gray-500 font-medium text-lg">Please provide all current information accurately.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Date of birth"
                        inputType="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({
                            ...formData,
                            dateOfBirth: e.target.value
                        })}
                        error={dateOfBirthError}
                    />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <p className="text-black text-sm font-semibold">Profile picture<span className="text-red-500 text-sm">*</span></p>
                    {!profilePicture && (
                        <ImgInput
                            placeholder="Profile picture"
                            onChange={handleImgUpload}
                            error={profilePictureError}
                        />
                    )}
                    {profilePicture && (
                        <img src={profilePicture} alt="Profile" className="h-[180px] w-full rounded-lg" />
                    )}
                </div>
            </div>
            <div className="flex gap-3">
                <SecondBtn onClick={handleBackStep} className="w-[40%]">Back</SecondBtn>
                <PrimaryBtn onClick={handleButtonClick} className="w-[60%]">Submit 3 / 3</PrimaryBtn>
            </div>
        </div>
    )
}
