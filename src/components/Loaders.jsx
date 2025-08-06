import { ColorRing } from "react-loader-spinner";

export const LoadingSpinner = () => (
  <div className="h-screen w-full flex justify-center items-center">
    <ColorRing
      visible={true}
      height="180"
      width="180"
      colors={['#3B82F6', "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"]}
      wrapperStyle={{ margin: "0 auto" }}
    />
  </div>
);
