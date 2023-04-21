import Image from "next/image";
import background from "../../public/background.jpeg";

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
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="flex flex-col gap-1">
              <h2 className="whitespace-nowrap font-wa-headline text-5xl font-semibold text-white md:text-6xl">
                28 Mai 2023
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
        </div>
      </div>
    </section>
  );
}
