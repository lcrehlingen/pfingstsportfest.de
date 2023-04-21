import { ReactNode } from "react";

export default function Title({
  children,
  center = true,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <h1
      className={`font-wa-headline text-5xl font-extrabold ${
        center ? `text-center` : `text-left`
      } leading-tight tracking-tight text-tourLightOrange`}
    >
      {children}
    </h1>
  );
}
