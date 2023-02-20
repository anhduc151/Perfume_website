import "./LoadingSkeleton.scss";
const LoadingSkeleton = ({ width, height }) => {
  return (
    <>
      <div className="line skeleton" style={{ height, width }}></div>
    </>
  );
};

export default LoadingSkeleton;
