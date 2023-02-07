import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="flex justify-center items-center flex-col">
      <ReactLoading type="bubbles" color="black" />
      <h1 className="font-bold">Loading...</h1>
    </div>
  );
}

export default Loading;
