const PrimaryButton = ({ text, className, type }) => {
  return (
    <button
      type={type}
      className={`bg-primary text-[#ffff] !important rounded-3xl px-4 py-2 mr-2 ${className}`}
    >
      {text}
    </button>
  );
};

const OutlineButton = ({ text, className }) => {
  return (
    <button
      className={`border border-secondary text-black rounded-3xl px-4 py-2 ${className}`}
    >
      {text}
    </button>
  );
};

export { PrimaryButton, OutlineButton };
