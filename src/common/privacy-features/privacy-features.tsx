// ================browser reload qilishni ogohlantirish uchun==================
export const unReload = () => {
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && (
      e.keyCode === 84 ||
      e.keyCode === 87
    ))) {
      alert('Саҳифани тарк этмоқчимисиз, узгаришлар сақланмаслиги мумкин');
      e.preventDefault();
    }
  });

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    const confirmationMessage = 'Сиз киритган ўзгаришлар сақланмаслиги мумкин';
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
};