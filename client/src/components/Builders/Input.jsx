const Input = ({ placeholder, value, type = "text", onKeyUp, className = "" }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onKeyUp={onKeyUp}
        className={"w-full p-2 text-lg transition-colors outline-none border border-inputs-bg bg-inputs-bg text-white-100 placeholder:text-white-400 hover:border-black focus:border-inputs-focus " + className}
      />
    );
};

export default Input;