import { useState, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathFormula = ({ text }: { text: string }) => {
  const [output, setOutput] = useState('');

  const loadModel = async () => {
    return {
      predict: (input: any) => {
        return input.map((str: any) =>
          /[^a-zA-Z0-9\s]/.test(str) ? 'symbol' : 'text'
        );
      }
    };
  };

  const processText = async (inputText: any) => {
    const formattedText = inputText.replace(/〖/g, '').replace(/〗/g, '');

    const model = await loadModel();
    const parts = formattedText.split(/(\s+)/);
    const predictions = model.predict(parts);

    const renderedOutput = parts
      .map((part: any, index: any) => {
        if (predictions[index] === 'symbol') {
          try {
            return katex.renderToString(part, { throwOnError: false });
          } catch (error) {
            return katex.renderToString(part.replace(/([#%&_{}~^\\])/g, '\\$1'), { throwOnError: false });
          }
        }
        return part;
      })
      .join('');

    setOutput(renderedOutput);
  };

  useEffect(() => {
    processText(text);
  }, [text]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
};

export default MathFormula;
