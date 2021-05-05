import Loader from "react-loader-spinner";

const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const LoaderSpinner = () => {
  return <Loader type="ThreeDots" color="#333" style={loaderStyle} />;
};

export default LoaderSpinner;
