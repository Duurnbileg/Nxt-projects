"use client"
import { useState } from "react";
import Step1 from "./features/step1";
import Step2 from "./features/step2";
import Step3 from "./features/step3";
import Step4 from "./features/step4";


export default function Home() {
  const [step, setStep] = useState(3)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: ""
  })

  const handleNextStep = () => setStep(step + 1)
  const handleBackStep = () => setStep(step - 1)
  const handleFinish = () => setStep(4)

  return (
    <main className="bg-[#f4f4f4] flex items-start justify-center h-dvh pt-20">
      {step === 1 && <Step1 handleNextStep={handleNextStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && (
        <Step2
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
          formData={formData} setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <Step3
          handleBackStep={handleBackStep}
          formData={formData} setFormData={setFormData}
          handleFinish={handleFinish}
        />
      )}
      {step === 4 && (
        <Step4 />
      )}
    </main>
  )
}
