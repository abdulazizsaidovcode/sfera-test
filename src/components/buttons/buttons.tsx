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
      className={`${disabled && 'opacity-70 cursor-not-allowed'} ${bWidth ? bWidth : 'w-max'} py-1.5 px-5 text-sm font-medium text-white focus:outline-none bg-slate-600 rounded-lg border-none hover:bg-gray-100 dark:bg-green-500 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
    >
      {children}
    </button>
  );
};

export default AddButtons;
