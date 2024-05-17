import Image from "next/image";
import sr from "../../../public/sr.jpg";
import Link from "next/link";

export default function Live() {
  return (
    <section className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-8 px-4 sm:grid sm:grid-cols-2  2xl:px-0">
      <div className="flex w-full justify-center order-2 sm:order-1">
        <div className="relative flex h-64 w-96 max-w-xl items-center justify-center">
          <Image src={sr} alt="Saarländischer Rundfunk" />
        </div>
      </div>
      <div className="flex flex-col gap-4 order-1 sm:order-2">
        <h2 className="font-wa-headline text-5xl font-extrabold tracking-tight text-gray-900">
          Live
        </h2>
        <p className="text-gray-500 md:text-lg">
          Auch in diesem Jahr überträgt der Saarländische Rundfunk das Rehlinger
          Pfingstsportfest zwei Stunden live im Fernsehen und im Livestream.
        </p>
        <p className="text-gray-500 md:text-lg">
          In Zusammenarbeit mit European Athletics wird es einen internationalen
          Livestream auf dem Youtube Kanal von European Athletics geben, welcher
          von Robert Baumann kommentiert wird.
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/watch?v=nts7TqhqbOM "
          className="inline-flex max-w-fit items-center rounded-lg bg-tourDarkBlue px-5 py-2.5 text-center text-lg font-medium text-tourLightOrange"
        >
          EA Livestream
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
