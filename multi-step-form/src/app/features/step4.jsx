import Input from "@/app/components/input";
import PrimaryBtn from "../components/primaryBtn";
import { useState } from "react";
import Image from "next/image";

export default function Step4() {
    return (
        <div className="bg-white h-fit w-[480px] rounded-xl p-8 flex flex-col justify-between">
            <div className="bg-white rounded-xl flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Image src="/logo.svg" alt="Logo" width={60} height={60} />
                    <h1 className="text-black text-[26px] font-semibold">You're All Set 🔥</h1>
                    <p className="text-gray-500 font-medium text-lg">We have received your submission. Thank you!</p>
                </div>
            </div>
        </div>
    )
}
