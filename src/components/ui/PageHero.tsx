import Image from "next/image";

type Props = {
  eyebrow?: string;
  kicker?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, kicker, title, description, image, imageAlt }: Props) {
  const label = eyebrow ?? kicker;
  return (
    <section className="relative overflow-hidden border-b border-evhsa-line bg-evhsa-ink text-white">
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          className="object-cover opacity-35"
          sizes="100vw"
          priority
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-evhsa-red/40" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
        {label ? <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">{label}</p> : null}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold md:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">{description}</p> : null}
      </div>
    </section>
  );
}
