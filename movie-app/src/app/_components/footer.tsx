import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full max-w-[1520px] h-[280px] max-sm:h-auto flex items-center justify-center mt-25 px-16 max-sm:px-6 max-sm:py-10 max-sm:flex-col max-sm:items-start max-sm:gap-8">
            <div className="w-full h-[160px] max-sm:h-auto flex items-start justify-between gap-4">
                <div className="flex flex-col items-start justify-start gap-4">
                    <Image
                        src="/Logo.png"
                        alt="logo"
                        width={92}
                        height={20}
                        className="object-contain"
                    ></Image>
                    <p className=" text-sm">© 2026 Movie App. All Rights Reserved.</p>
                </div>
            </div>
            <div className="w-[910px] max-w-full h-[160px] max-sm:h-auto flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
                <div className="h-full flex flex-col items-start justify-start gap-4">
                    <p className="text-sm">Contact Information</p>
                    <p className="text-sm">Email: support@moviez.com</p>
                    <p className="text-sm">Phone: +976 99664639</p>
                </div>
                <div className="h-full flex flex-col items-start justify-start gap-4">
                    <p className="text-sm">Follow us on</p>
                    <div className="flex items-center gap-2">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <p className="text-sm">Facebook</p>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <p className="text-sm">Twitter</p>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <p className="text-sm">Instagram</p>
                        </a>
                    </div>
                </div>
            </div>
        </footer >
    )
}