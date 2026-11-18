import Image from "next/image";

type Props = {
  kicker: string;
  title: string;
  description?: string;
  image?: string;
};

export function PageHero({ kicker, title, description, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-evhsa-ink text-white">
      {image ? (
        <Image src={image} alt="" fill className="object-cover opacity-35" sizes="100vw" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-evhsa-red/40" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">{description}</p> : null}
      </div>
    </section>
  );
}
