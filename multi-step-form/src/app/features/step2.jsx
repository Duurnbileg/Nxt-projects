import Input from "@/app/components/input";
import PrimaryBtn from "../components/primaryBtn";
import SecondBtn from "../components/secondaryBtn";
import { useState } from "react";
import Image from "next/image";

export default function Step2({ handleNextStep, handleBackStep, formData, setFormData }) {
    const [confirmPassword, setConfirmPassword] = useState("");

    const [eMailError, setEMailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passWordError, setPassWordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validateInput = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,12}$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,}$/

        if (formData.email.length == 0) {
            setEMailError("Имэйл хаягаа оруулна уу");
            isValid = false;
        } else if (emailRegex.test(formData.email) == false) {
            setEMailError("Зөв имэйл хаяг оруулна уу");
            isValid = false;
        } else {
            setEMailError("");
        }

        if (formData.phoneNumber.length == 0) {
            setPhoneNumberError("Утасны дугаараа оруулна уу");
            isValid = false;
        } else if (phoneRegex.test(formData.phoneNumber) == false) {
            setPhoneNumberError("Зөв утасны дугаар оруулна уу");
            isValid = false;
        } else {
            setPhoneNumberError("");
        }

        if (formData.password.length == 0) {
            setPassWordError("Нууц үгээ оруулна уу");
            isValid = false;
        } else if (passRegex.test(formData.password) == false) {
            setPassWordError("Доод тал нь 8 тэмдэгт, 1 үсэг + 1 тоо агуулсан байх ёстой.");
            isValid = false;
        } else {
            setPassWordError("");
        }

        if (confirmPassword.length == 0) {
            setConfirmPasswordError("Нууц үгээ давтан оруулна уу");
            isValid = false;
        } else if (confirmPassword !== formData.password) {
            setConfirmPasswordError("Нууц үг таарахгүй байна");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        return isValid;
    };

    const handleButtonClick = () => {
        if (validateInput() == true) {
            handleNextStep();
        }
    };

    return (
        <div className="bg-white h-[650px] w-[480px] rounded-xl p-8 flex flex-col justify-between">
            <div className="bg-white rounded-xl flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Image src="/logo.svg" alt="Logo" width={60} height={60} />
                    <h1 className="text-black text-[26px] font-semibold">Join Us! 😎</h1>
                    <p className="text-gray-500 font-medium text-lg">Please provide all current information accurately.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                        error={eMailError}
                    />
                    <Input
                        placeholder="Phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({
                            ...formData,
                            phoneNumber: e.target.value
                        })}
                        error={phoneNumberError}
                    />
                    <Input
                        placeholder="Password"
                        inputType="password"
                        value={formData.password}
                        onChange={(e) => setFormData({
                            ...formData,
                            password: e.target.value
                        })}
                        error={passWordError}
                    />
                    <Input
                        placeholder="Confirm password"
                        inputType="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={confirmPasswordError}
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <SecondBtn onClick={handleBackStep} className="w-[40%]">Back</SecondBtn>
                <PrimaryBtn onClick={handleButtonClick} className="w-[60%]">Continue 2 / 3</PrimaryBtn>
            </div>
        </div>
    )
}
