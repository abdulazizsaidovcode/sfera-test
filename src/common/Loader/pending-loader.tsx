const PendingLoader = () => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-opacity-50 bg-black-2">
      <div className="flex h-screen items-center justify-center">
        <div
          className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent">
        </div>
      </div>
    </div>
  );
};

export default PendingLoader;
