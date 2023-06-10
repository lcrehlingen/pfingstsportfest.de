import Image from "next/image";
import background from "../../public/background.jpeg";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
      relative
      min-h-[70vh]
      content-center
      items-center
      justify-center
    "
    >
      <div className="absolute flex h-full w-full items-center bg-white ">
        <Image
          className="absolute left-0 top-0 h-full w-full object-cover"
          src={background}
          priority
          placeholder="blur"
          alt="100m Sprint Hintergrundbild"
        />
        <span className="absolute h-full w-full bg-black opacity-50"></span>
        <div className="absolute w-full">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex flex-col gap-4">
            <div>
              <div className="flex flex-col gap-1">
                <h2 className="whitespace-nowrap font-wa-headline text-5xl font-semibold text-white md:text-6xl">
                  19 Mai 2024
                </h2>
                <h2 className="font-wa-headline text-5xl font-semibold text-white md:text-6xl">
                  Pfingstsportfest Rehlingen
                </h2>
              </div>
              <a
                href="https://goo.gl/maps/jQbZfb5od2j4bcb49"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-3xl font-semibold text-[#C1FB6E] md:text-4xl"
              >
                Bungertstadion
              </a>
            </div>
            <div className="flex flex-row gap-4">
              {/*<a
                  href="https://www.youtube.com/watch?v=lamehYbjYJs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-fit items-center rounded-lg bg-sky-500 px-5 py-2.5 text-center text-lg font-medium text-white"
                >
                  Live-Stream
              </a>*/}
              <Link
                href="/ergebnisse"
                className="inline-flex max-w-fit items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
              >
                Ergebnisse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
