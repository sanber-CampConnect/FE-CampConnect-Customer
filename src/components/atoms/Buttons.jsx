const PrimaryButton = ({ text, className, type, onClick }) => {
  return (
    <button
      type={type}
      className={`bg-primary text-[#ffff] px-4 py-2 mr-2 rounded-3xl justify-center ${className}`}
      onClick={onClick}
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
