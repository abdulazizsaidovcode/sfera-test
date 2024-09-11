import { Popover } from 'antd';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import { consoleClear } from '../../common/console-clear/console-clear.tsx';

const PublicOffer = () => {
  const navigate = useNavigate();
  const [docxContent, setDocxContent] = useState<string | null>(null);

  useEffect(() => {
    offerView();
  }, []);

  const offerView = async () => {
    const fileUrl = '/oferta.docx';

    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocxContent(result.value);
    } catch (error) {
      console.error('Failed to load the document.');
      consoleClear();
    }
  };

  return (
    <>
      <Popover title="Орқага қайтиш" overlayStyle={{ textAlign: 'center' }}>
        <MdKeyboardBackspace
          className={`text-3xl hover:cursor-pointer hover:text-primary duration-300 mb-5`}
          onClick={() => navigate(-1)}
        />
      </Popover>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Оммавий оферта шартлари
      </h1>

      {docxContent && (
        <div
          className={`w-full max-h-[600px] border border-slate-200 dark:border-slate-500 rounded-md p-8 overflow-y-auto bg-white dark:bg-black`}
          dangerouslySetInnerHTML={{ __html: docxContent }}
        />
      )}
    </>
  );
};

export default PublicOffer;
