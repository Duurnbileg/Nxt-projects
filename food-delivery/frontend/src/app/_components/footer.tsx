import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = ({ texts }: { texts: string[] }) => {
    const marqueeItems = [...texts, ...texts]

    return (
        <footer className="w-full overflow-hidden py-20 bg-black">
            <div className="overflow-hidden bg-red-400 py-8">
                <div className="flex w-max animate-marquee gap-8">
                    {marqueeItems.map((item, index) => (
                        <p
                            key={index}
                            className="text-white text-3xl font-bold whitespace-nowrap"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <div className="w-full py-20 px-6 sm:px-12 lg:px-40 flex flex-wrap justify-between items-start gap-8">
                <Image
                    src="/footer-logo.png"
                    alt="footer logo"
                    width={80}
                    height={80}
                    loading="eager"
                    className="object-contain"
                />
                <div className="flex gap-8">
                    <div className="flex flex-col text-white">
                        <Button variant="ghost" className="bg-none hover:bg-zinc-900 hover:text-white">NOMNOM</Button>
                        <Button variant="ghost" className="bg-none hover:bg-zinc-900 hover:text-white">Home</Button>
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
        </footer>
    )
}