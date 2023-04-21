import { ReactNode } from "react";

export default function ContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="py-8">
      <section className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex flex-col gap-8">
        {children}
      </section>
    </main>
  );
}
