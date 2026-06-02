import { ReactNode } from "react";

export default function ContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="py-8 flex-1 flex flex-col">
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 2xl:px-0 flex flex-col gap-8 w-full flex-1">
        {children}
      </section>
    </main>
  );
}
