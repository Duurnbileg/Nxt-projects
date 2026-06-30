import Input from "@/app/components/input";
import PrimaryBtn from "../components/primaryBtn";
import { useState } from "react";
import Image from "next/image";

export default function Step1({ handleNextStep, formData, setFormData }) {

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [userNameError, setUserNameError] = useState("");

    const validateInput = () => {
        const onlyLetters = /^[\p{L}\s'-]+$/u;
        let isValid = true;

        if (formData.firstName.length == 0) {
            setFirstNameError("Нэрээ оруулна уу");
            isValid = false;
        } else if (onlyLetters.test(formData.firstName) == false) {
            setFirstNameError("Нэр зөвхөн үсгээр байх ёстой");
            isValid = false;
        } else {
            setFirstNameError("");
        }

        if (formData.lastName.length == 0) {
            setLastNameError("Овгоо оруулна уу");
            isValid = false;
        } else if (onlyLetters.test(formData.lastName) == false) {
            setLastNameError("Овог зөвхөн үсгээр байх ёстой");
            isValid = false;
        } else {
            setLastNameError("");
        }

        if (formData.userName.length == 0) {
            setUserNameError("Username оруулна уу");
            isValid = false;
        } else if (formData.userName.length < 3) {
            setUserNameError("Username хамгийн багадаа 3 тэмдэгт байх ёстой");
            isValid = false;
        } else {
            setUserNameError("");
        }

        return isValid;
    };

    const handleButtonClick = () => {
        const isValid = validateInput();
        if (isValid == true) {
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
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({
                            ...formData,
                            firstName: e.target.value,
                        })}
                        error={firstNameError}
                    />
                    <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({
                            ...formData,
                            lastName: e.target.value,
                        })}
                        error={lastNameError}
                    />
                    <Input
                        placeholder="Username"
                        value={formData.userName}
                        onChange={(e) => setFormData({
                            ...formData,
                            userName: e.target.value
                        })}
                        error={userNameError}
                    />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <PrimaryBtn onClick={handleButtonClick}>Continue 1 / 3</PrimaryBtn>
            </div>
        </div>
    )
}
