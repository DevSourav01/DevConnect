interface Props {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const Skeleton = ({
  width = "100%",
  height = "16px",
  rounded = "rounded-lg",
  className = "",
}: Props) => {
  return (
    <div
      style={{ width, height }}
      className={`bg-grey-100 animate-pulse ${rounded}${className}`}
    ></div>
  );
};

export default Skeleton