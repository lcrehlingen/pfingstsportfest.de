"use client";

import dynamic from "next/dynamic";

// Dynamically import the heavy Three.js component with SSR disabled
const Stadium3DViewer = dynamic(
  () => import("./Stadium3DViewer"),
  { ssr: false }
);

export default function StadionClient() {
  return (
    <div className="w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[600px] md:min-h-[750px] flex flex-col">
      <Stadium3DViewer />
    </div>
  );
}
