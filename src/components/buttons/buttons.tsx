const AddButtons = (
  {
    bWidth,
    children,
    onClick,
    disabled = false,
    type,
    icon
  }: {
    bWidth?: string,
    children: any,
    onClick?: () => void,
    disabled?: boolean,
    icon?: boolean,
    type?: string
  }) => {
  return (
    <button
      type={`${type ? 'submit' : 'button'}`}
      onClick={onClick}
      disabled={disabled}
      className={`${disabled && 'opacity-70 cursor-not-allowed'} ${bWidth ? bWidth : 'w-full'} ${icon && 'flex gap-3 items-center justify-start'} py-2 px-5 text-sm font-medium text-white focus:outline-none bg-[#16423C] rounded-lg border-none active:opacity-80 transition ease-in-out hover:bg-gray-100`}
    >
      {children}
    </button>
  );
};

export default AddButtons;
