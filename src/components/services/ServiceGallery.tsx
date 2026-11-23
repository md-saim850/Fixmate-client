import Image from "next/image";

export function ServiceGallery({image, title,}: {
  image: string;
  title: string;
}) {

  return (
    <div className="space-y-4">
      <div className="group relative h-[320px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[440px]">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
