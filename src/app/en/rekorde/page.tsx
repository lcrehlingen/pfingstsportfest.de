import RekordeTemplate from "@/templates/RekordeTemplate";

export const metadata = {
  title: "Stadium Records",
  description: "Browse all official stadium records of both men and women events in the Bungert Stadium.",
};

export default function Page() {
  return <RekordeTemplate locale="en" />;
}
