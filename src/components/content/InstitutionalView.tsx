import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { InstitutionalPage } from "@/content/institutional";

export function InstitutionalView({ page }: { page: InstitutionalPage }) {
  return (
    <div>
      <PageHero kicker={page.kicker} title={page.heading} image={page.image} />
      <article className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-evhsa-muted">Fuente original: {page.originalPath}</p>
        <div className="prose-evhsa">
          {page.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {page.lists?.map((list, index) => (
            <div key={index}>
              {list.intro ? <p>{list.intro}</p> : null}
              <ul>
                {list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {page.images?.length ? (
          <div className="mt-10 grid gap-6">
            {page.images.map((image) => (
              <figure key={image.src} className="overflow-hidden rounded-evhsa bg-white shadow-card">
                <Image src={image.src} alt={image.alt} width={1200} height={800} className="h-auto w-full object-cover" />
                {image.caption ? <figcaption className="p-3 text-sm text-evhsa-muted">{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}
