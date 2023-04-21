import Image from "next/image";
import sr from "../../../public/sr.jpg";

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
          Auch in diesem Jahr überträgt der Saarländische Rundfunk das
          Rehlinger Pfingstsportfest zwei Stunden live im Fernsehen und im
          Livestream.
        </p>
        <p className="text-gray-500 md:text-lg">
          In Zusammenarbeit mit European Athletics wird es einen internationalen
          Livestream auf dem Youtube Kanal von European Athletics geben.
        </p>
      </div>
    </section>
  );
}
