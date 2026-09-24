"use client";
import Image from "next/image";
import { Step1 } from "./components/step1";
import { Step2 } from "./components/step2";
import { useState } from "react";

export default function SignupPage() {
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    }

    const handlePrevStep = () => {
        setStep((prev) => prev - 1);
    }
    return (
        <main className="w-full h-screen flex justify-center gap-4 min-h-screen p-2">
            <div className="flex justify-center items-center w-2/5 gap-6 rounded-lg">
                {step === 1 && <Step1 handleNextStep={handleNextStep} />}
                {step === 2 && <Step2 handlePrevStep={handlePrevStep} />}
            </div>
            <Image
                src="/Login.png"
                alt="Login"
                width={600}
                height={600}
                className="h-full w-3/5 object-cover rounded-2xl"
            />
        </main>
    )
}