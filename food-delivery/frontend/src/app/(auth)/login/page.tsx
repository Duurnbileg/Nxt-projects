import Image from "next/image";
import { Login } from "./components/login";

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex justify-center gap-4 min-h-screen p-2">
            <div className="flex justify-center items-center w-2/5 gap-6 rounded-lg">
                <Login />
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