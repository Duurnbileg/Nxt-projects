import Image from "next/image";
import { Step1 } from "./components/step-1";

export default function Login() {
    return (
        <main className="flex items-center justify-center min-h-screen py-2">
            <Step1 />
            <Image
                src="/Login.png"
                alt="Login"
                width={400}
                height={400}
            />
        </main>
    )
}