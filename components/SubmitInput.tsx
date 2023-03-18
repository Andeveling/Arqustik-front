import cn from "classnames";

type Props = {
  value: string
  isLoading: boolean
}

const SubmitInput = ({ value, isLoading }: Props) => {
  const classes = cn({
    "inline-block text-white rounded px-4 py-3 w-fit": true,
    "bg-gray-700 hover:bg-gray-800 cursor-pointer": !isLoading,
    "bg-gray-400": isLoading,
  });

  const label = isLoading ? "Loading..." : value;

  return <input className={classes} type='submit' value={label} disabled={isLoading} />;
};

export default SubmitInput;
