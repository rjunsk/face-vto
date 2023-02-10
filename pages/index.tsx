import dynamic from "next/dynamic";

const DynamicFaceMesh = dynamic(() => import("../lib/components/FaceMesh"), {
  ssr: false,
});

export default function Home() {
  return <DynamicFaceMesh />;
}
