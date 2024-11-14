/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfinitySpin } from "react-loader-spinner";

function Loader({ loading, width }: any): JSX.Element {
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center h-screen">
            <InfinitySpin width={width} color="#808080" />
          </div>
        </div>
      )}
    </>
  );
}
export default Loader;
