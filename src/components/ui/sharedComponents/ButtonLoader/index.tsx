/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThreeDots } from "react-loader-spinner";

function Loader({ loading }: any): JSX.Element {
  return (
    <>
      {loading && (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      )}
    </>
  );
}
export default Loader;
