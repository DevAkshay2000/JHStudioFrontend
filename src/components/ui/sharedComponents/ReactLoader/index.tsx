/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfinitySpin } from "react-loader-spinner";

function Loader({ loading }: any): JSX.Element {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-60 z-50">
          <InfinitySpin width="300" color="#000000" />
        </div>
      )}
    </>
  );
}
export default Loader;
