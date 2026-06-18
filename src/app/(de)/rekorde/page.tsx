import RekordeTemplate from "@/templates/RekordeTemplate";

export const metadata = {
  title: "Stadionrekorde",
  description: "Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.",
};

export default function Page() {
  return <RekordeTemplate locale="de" />;
}
