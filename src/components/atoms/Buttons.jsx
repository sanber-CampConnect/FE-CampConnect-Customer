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

const OutlineButton = ({ text, className, onClick }) => {
  return (
    <button
      className={`border text-black rounded-3xl px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const TextButton = ({ text, className, onClick }) => {
  return (
    <div className=" flex justify-end">
      <button
        className={`text-[#8D8BA7] font-semibold text-base w-[100px] text-right ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

const BackButton = ({ onClick, className }) => {
  return (
    <div className="rounded-full bg-white shadow-md flex w-9 h-9 items-center justify-center">
      <button className={`font-semibold ${className}`} onClick={onClick}>
        <i className="bi bi-arrow-left text-lg"></i>
      </button>
    </div>
  );
};

export { PrimaryButton, OutlineButton, TextButton, BackButton };
