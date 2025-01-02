import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"

export const MegaImage = async ({ src, className }) => {
    const buffer = await fetch(src).then(async (res) => {
        return Buffer.from(await res.arrayBuffer())
    })

    const { base64 } = await getPlaiceholder(buffer)
    return (
        <div>
            <Image
                src={src}
                alt="image-from-mega"
                fill
                placeholder="blur"
                blurDataURL={base64}
                className={`${className} object-cover`}
            />
        </div>
    )
}