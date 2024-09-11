const AddButtons = (
  {
    bWidth,
    children,
    onClick,
    disabled = false,
    type
  }: {
    bWidth?: string,
    children: any,
    onClick?: () => void,
    disabled?: boolean,
    type?: string
  }) => {
  return (
    <button
      type={`${type ? 'submit' : 'button'}`}
      onClick={onClick}
      disabled={disabled}
      className={`${disabled && 'opacity-70 cursor-not-allowed'} ${bWidth ? bWidth : 'w-max'} py-1.5 px-5 text-sm font-medium text-white focus:outline-none bg-[#16423C]  rounded-lg border-none active:bg-[#6A9C89] transition ease-in-out hover:bg-gray-100`}
    >
      {children}
    </button>
  );
};

export default AddButtons;
