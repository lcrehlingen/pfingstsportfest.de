import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <ContentContainer>
      <h2 className="font-wa-headline text-5xl font-extrabold leading-tight tracking-tight text-[#FF8140]">
        404
      </h2>

      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Diese Seite existiert nicht
          </p>
          <Link
            href="/"
            className="bg-primary-600 hover:bg-primary-800 focus:ring-primary-300 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-lg font-medium text-white focus:outline-none focus:ring-4"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </ContentContainer>
  );
}
