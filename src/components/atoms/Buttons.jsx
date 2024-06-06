const PrimaryButton = ({ text }) => {
  return (
    <button className="bg-primary text-white rounded-lg px-4 py-2 mr-2">
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
