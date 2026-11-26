import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Play } from "lucide-react";

const stories = [
  {
    number: "01",
    location: "Northern Ghana",
    title: "A tricycle for a missionary on the move",
    description:
      "We supported a missionary in the north with a tricycle—a practical tool to help him travel as he carries out his work in the communities he serves.",
    note: "Support provided",
  },
  {
    number: "02",
    location: "Kenya",
    title: "A Bluetooth speaker to support ministry",
    description:
      "A missionary in Kenya received a Bluetooth speaker to aid his work. A simple piece of audio equipment can help make sharing a message easier wherever people gather.",
    note: "Support provided",
  },
];

// Swap these placeholder image paths for the supplied story photos as they arrive.
const evidenceStories = [
  {
    id: "tricycle-evidence",
    title: "The tricycle in northern Ghana",
    description:
      "A closer look at the practical support provided to help a missionary reach the communities he serves.",
    images: [
      {
        src: "/img3.jpg",
        alt: "Placeholder: missionary serving in the field",
        caption: "Missionary at work",
      },
      {
        src: "/img4.jpg",
        alt: "Placeholder: outreach materials prepared for ministry",
        caption: "Preparing for outreach",
      },
      {
        src: "/img3.jpg",
        alt: "Placeholder: Bible used in ministry",
        caption: "The work being supported",
      },
    ],
    videos: [
      {
        poster: "/img3.jpg",
        title: "Tricycle support story",
        note: "Add the tricycle missionary video here",
      },
    ],
  },
  {
    id: "kenya-evidence",
    title: "The Bluetooth speaker in Kenya",
    description:
      "Video moments documenting the speaker support and how it helps the missionary share his message.",
    images: [],
    videos: [
      {
        poster: "/img3.jpg",
        title: "Speaker support in Kenya · video 1",
        note: "Add the first Kenya video here",
      },
      {
        poster: "/img4.jpg",
        title: "Speaker support in Kenya · video 2",
        note: "Add the second Kenya video here",
      },
    ],
  },
];

function EvidencePlaceholder({
  poster,
  title,
  note,
}: {
  poster: string;
  title: string;
  note: string;
}) {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden bg-inverse"
      aria-label={`${title} video placeholder`}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-inverse/35 p-5 text-center text-inverse-foreground">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-inverse-foreground/70 bg-black/20">
          <Play aria-hidden="true" className="ml-1 h-5 w-5 fill-current" />
        </span>
        <span className="mt-4 text-sm font-semibold">{title}</span>
        <span className="mt-1 text-xs text-inverse-foreground/80">{note}</span>
      </div>
    </div>
  );
}

export default function SuccessStoriesContent() {
  return (
    <>
      <section className="px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">
              Stories of practical support
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.25rem]">
              Tools for the work.{" "}
              <span className="font-serif italic font-normal text-brand">
                Stories of hope.
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              A tricycle in northern Ghana. A speaker in Kenya. Each gift begins
              with a missionary&apos;s need and helps support the work they are
              called to do.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="#stories"
                className="inline-flex items-center gap-3 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Read the stories{" "}
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/partner"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                Become a partner{" "}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <Image
                src="/img3.jpg"
                alt="A missionary holding books for ministry"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between border-t border-border pt-3 text-xs uppercase tracking-[0.13em] text-muted-foreground">
              <span>Equipping the work</span>
              <span>Field ministry</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="stories"
        className="scroll-mt-24 bg-card px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
                Support provided
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Help that meets a real need.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              These are early steps in a longer mission. We are grateful to
              everyone whose generosity helped make this practical support
              possible.
            </p>
          </div>

          <div className="border-t border-border">
            {stories.map((story) => (
              <article
                key={story.number}
                className="grid gap-5 border-b border-border py-8 md:grid-cols-[100px_0.8fr_1.2fr] md:gap-10 md:py-10"
              >
                <p className="font-serif text-4xl italic text-brand-muted/70">
                  {story.number}
                </p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
                    {story.location}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-subtle-foreground">
                    {story.note}
                  </p>
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {story.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
              In progress
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              The next story is still being written.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              We are exploring support for another missionary who needs a
              projector, filming tools, and a speaker to aid his work. This
              support is being planned and has not yet been provided.
            </p>
            <Link
              href="/partner"
              className="mt-7 inline-flex items-center gap-3 border border-input px-5 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-card"
            >
              Help make the next story possible{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-16">
            {evidenceStories.map((story) => (
              <article
                key={story.id}
                id={story.id}
                className="scroll-mt-24 border-t border-border pt-8"
              >
                <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
                      Evidence of support
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      {story.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    {story.description}
                  </p>
                </div>
                <div
                  className={`grid gap-5 ${story.images.length ? "lg:grid-cols-[1.35fr_1fr]" : ""}`}
                >
                  {story.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {story.images.map((photo, index) => (
                        <figure
                          key={photo.src}
                          className={index === 0 ? "col-span-2" : ""}
                        >
                          <div
                            className={`relative overflow-hidden bg-border ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="mt-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                            {photo.caption} · placeholder
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                  <div
                    className={`grid content-start gap-5 ${story.videos.length > 1 ? "sm:grid-cols-2" : ""}`}
                  >
                    {story.videos.map((video) => (
                      <figure key={video.title}>
                        <EvidencePlaceholder
                          poster={video.poster}
                          title={video.title}
                          note={video.note}
                        />
                        <figcaption className="mt-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                          4:3 video placeholder
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
              Watch
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              The mission behind each story.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              Get to know the heart of Jesus&apos; Mission Fund and the work
              that brings partners and missionaries together.
            </p>
          </div>
          <div className="overflow-hidden bg-inverse">
            <video
              src="/JesusMissionFund_Intro.mp4"
              poster="/img4.jpg"
              controls
              preload="metadata"
              playsInline
              aria-label="Jesus’ Mission Fund introduction"
              className="aspect-video w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-inverse px-6 py-16 text-inverse-foreground md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-inverse-muted">
              Be part of what comes next
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Your partnership can meet the next need.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-inverse-foreground/70">
              Stand with missionaries through prayer and practical support.
            </p>
          </div>
          <Link
            href="/partner"
            className="inline-flex w-fit shrink-0 items-center gap-3 border border-inverse-foreground/35 px-6 py-4 text-sm font-semibold text-inverse-foreground transition-colors hover:bg-card hover:text-inverse"
          >
            Partner with us{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
