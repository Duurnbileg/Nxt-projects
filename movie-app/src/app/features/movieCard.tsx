import Image from "next/image";

export default function MovieCard() {
    return (
        <div>
            <Image
                src="/cardImg.png"
                alt="hero"
                width={230}
                height={340}
                className="absolute w-[230px] h-[340px]"
            />
        </div>
    );
}
