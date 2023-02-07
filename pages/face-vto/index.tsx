import dynamic from "next/dynamic";

const DynamicFaceMesh = dynamic(() => import("./components/FaceMesh"), {
  ssr: false,
});

const FaceVTO = () => {
  return <DynamicFaceMesh />;
};

export default FaceVTO;
