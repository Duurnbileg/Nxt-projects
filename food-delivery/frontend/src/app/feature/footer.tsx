import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export const Footer = ({ texts }: { texts: string[] }) => {

    return (
        <main className="w-full max-w-380 py-20 bg-black">
            <div className="bg-red-400 p-10 flex gap-8">
                {texts.map((item, index) => (
                    <p
                        key={index}
                        className="text-white text-3xl font-bold whitespace-nowrap"
                    >
                        {item}
                    </p>
                ))}
            </div>
            <div className="w-full py-20 px-40 flex justify-between">
                <Image
                    src="/Navigation/footer-logo.png"
                    alt="footer logo"
                    width={80}
                    height={80}
                    loading="eager"
                />
                <div className="flex gap-8">
                    <div className="flex flex-col">
                        <Button>NOMNOM</Button>
                        <Button>Home</Button>
                        <Button>Contact us</Button>
                        <Button>Delivery zone</Button>
                    </div>
                    <div className="grid grid-rows-3 grid-cols-2">
                        <Button>MENU</Button>
                        <Button>Appetizers</Button>
                        <Button>Salads</Button>
                        <Button>Pizzas</Button>
                        <Button>Main dishes</Button>
                        <Button>Desserts</Button>
                        <Button>Side dish</Button>
                        <Button>Brunch</Button>
                        <Button>Desserts</Button>
                        <Button>Beverages</Button>
                        <Button>Fish & Sea foods</Button>
                    </div>
                    <div className="flex flex-col">
                        <Button>Follow us</Button>
                        <div className="flex">
                            <Button variant='ghost' className="hover:bg-zinc-800">
                                <Image
                                    src="/facebook.png"
                                    alt="facebook"
                                    width={24}
                                    height={24}
                                    loading="eager"
                                />
                            </Button>
                            <Button variant='ghost' className="hover:bg-zinc-800">
                                <Image
                                    src="/instagram.png"
                                    alt="facebook"
                                    width={24}
                                    height={24}
                                    loading="eager"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}