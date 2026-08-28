import Image from "next/image"

export const Hero = () => {
    return (
        <Image
            src="/Navigation/BG.png"
            alt="Description"
            width={1520}
            height={620}
            loading="eager"
            className="object-cover"
        />
    )
}