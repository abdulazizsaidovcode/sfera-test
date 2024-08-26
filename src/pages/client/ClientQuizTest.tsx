import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useTestStore from '../../common/state-management/testStore';
import { fetchQuiz, sendResults } from '../../common/logic-functions/test';
import { TestOptionDtos } from '../../types/test';
import AddButtons from '../../components/buttons/buttons';
import { api_videos_files } from '../../common/api/api';
import globalStore from '../../common/state-management/globalStore';
import { Image, ProgressProps, Skeleton } from 'antd';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { unReload } from '../../common/privacy-features/privacy-features';
import { Progress } from 'antd';

const ClientQuizTest = () => {
  const { quizData, setQuizData, setCurrentIndex, currentIndex } = useTestStore();
  const { isLoading, setIsLoading } = globalStore();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isVisibleIndex, setIsVisibleIndex] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); // New state variable to track if results have been sent
  const navigate = useNavigate();
  const [totalTime, setTotalTime] = useState<number>(0); // New state to track the total time
  const { id } = useParams<{ id: string }>();

  const payload = quizData.quizList.map((question) => {
    const answer = answers[question.id];
    switch (question.type) {
      case 'ONE_CHOICE':
        return answer !== undefined ? {
          questionId: question.id,
          optionIds: [answer],
          answer: ''
        } : null;
      case 'SUM':
        return answer !== undefined ? {
          questionId: question.id,
          answer,
          optionIds: []
        } : null;
      case 'ANY_CORRECT':
        return answer !== undefined ? {
          questionId: question.id,
          optionIds: [answer],
          answer: ''
        } : null;
      case 'MANY_CHOICE':
        return answer && answer.length > 0 ? {
          questionId: question.id,
          optionIds: answer,
          answer: ''
        } : null;
      default:
        return null;
    }
  }).filter(answer => answer !== null);

  useEffect(() => {
    if (id) {
      fetchQuiz(id, setQuizData, setIsLoading, setTotalTime);
    }
  }, [id, setQuizData, setIsLoading]);

  useEffect(() => {
    unReload();
  }, [])

  useEffect(() => {
    if (quizData && quizData.remainingTime !== undefined) {
      const savedTime = localStorage.getItem('remainingTime');
      const savedIndex = localStorage.getItem('currentIndex');
      setRemainingTime(savedTime ? parseInt(savedTime) : quizData.remainingTime * 60);
      setCurrentIndex(savedIndex ? parseInt(savedIndex) : 0);
    }
  }, [quizData, setCurrentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (quizData.remainingTime ? prevTime <= 1 : false) {
          clearInterval(timer);
          if (!hasSubmitted) {
            setHasSubmitted(true);
            alert('Вақт бўлди!');
            navigate('/');
            sendResults(id, time, quizData.quiz.countAnswers, payload, navigate, setIsBtnLoading, setCurrentIndex, setQuizData);
          }
          return 0;
        }
        const newTime = prevTime - 1;
        quizData.remainingTime === 0 ? null : localStorage.setItem('remainingTime', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id, navigate, payload, quizData.quiz.countAnswers, setIsBtnLoading, hasSubmitted]);

  const time = quizData.remainingTime - Math.round(remainingTime / 60);

  useEffect(() => {
    setIsNextDisabled(true);
  }, [currentIndex]);

  useEffect(() => {
    const currentQuestion = quizData.quizList[currentIndex];
    let hasSelected = false;
    if (currentQuestion) {
      switch (currentQuestion.type) {
        case 'ONE_CHOICE':
        case 'ANY_CORRECT':
          hasSelected = answers[currentQuestion.id] !== undefined;
          break;
        case 'MANY_CHOICE':
          hasSelected = answers && answers[currentQuestion.id]?.length > 0;
          break;
        case 'SUM':
          hasSelected = answers[currentQuestion.id] !== undefined;
          break;
        default:
          break;
      }
    }
    setIsNextDisabled(!hasSelected);
    localStorage.setItem('currentIndex', currentIndex.toString());
  }, [answers, currentIndex, quizData.quizList]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.quizList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const toggleVisibleIndex = () => setIsVisibleIndex(!isVisibleIndex);

  const sortQuiz = (index: number, type: string, optionList: TestOptionDtos[] | undefined, name: string, attachmentIds: string[]) => {
    if (!optionList) return <div></div>;

    switch (type) {
      case 'SUM':
        return (
          <div>
            <div className="flex py-5 justify-center">
              <p className="text-xl">{`${index}. ${name}`}</p>
            </div>
            {attachmentIds && attachmentIds.length > 0 && (
              <div className="flex justify-center items-center py-5">
                <Image
                  style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                  src={api_videos_files + attachmentIds[0]}
                  alt="img"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label
                htmlFor={`input[${currentIndex}]`}
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Жавобингизни киритинг
              </label>
              <input
                id={`input[${currentIndex}]`}
                placeholder="Жавоб"
                value={answers[optionList[0]?.questionId] || ''} // Set the value to the stored answer if available
                onChange={(e) => handleAnswerChange(optionList[0]?.questionId, e.target.value)}
                className="rounded-lg px-2 py-1 border text-[#000]"
                type="text"
              />
            </div>
          </div>
        );
      case 'ONE_CHOICE':
      case 'ANY_CORRECT':
        return (
          <div>
            <div className="flex py-5 justify-center">
              <p className="text-xl">{`${index}. ${name}`}</p>
            </div>
            {attachmentIds && attachmentIds.length > 0 && <div className="flex justify-center items-center py-5">
              <Image
                style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                src={api_videos_files + attachmentIds[0]}
                alt="img"
              />
            </div>}
            <ul className="text-sm flex  flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              {optionList.map((item, index) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`radio-${index}`}
                      type="radio"
                      checked={answers[item.questionId] === item.id}
                      onChange={() => handleAnswerChange(item.questionId, item.id)}
                      className="w-5 h-4 text-blue-600 bg-gray-100  focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    {item.file &&
                      <Image
                        width={100}
                        height={70}
                        src={api_videos_files + item.file}
                        className='object-cover'
                      />
                    }
                    <label
                      htmlFor={`radio-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {item.answer}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'MANY_CHOICE':
        return (
          <div>
            <div className="flex py-5 justify-center">
              <p className="text-xl">{`${index}. ${name}`}</p>
            </div>
            {attachmentIds && attachmentIds.length > 0 && <div className="flex justify-center items-center py-5">
              <Image
                style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                src={api_videos_files + attachmentIds[0]}
                alt="img"
              />
            </div>}
            <ul className="text-sm flex flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              {optionList.map((item, index) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      checked={answers[item.questionId]?.includes(item.id)}
                      onChange={(e) => {
                        const newValues = answers[item.questionId] || [];
                        if (e.target.checked) {
                          handleAnswerChange(item.questionId, [...newValues, item.id]);
                        } else {
                          handleAnswerChange(item.questionId, newValues.filter((id: number) => id !== item.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {item.answer}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const progressPercent = totalTime > 0 ? (remainingTime / totalTime) * 100 : 0;
  return (
    <div>
      <div className="dark:bg-[#24303F] bg-white my-3 shadow-lg w-full p-5 rounded-2xl">
        <Progress percent={progressPercent} showInfo={false}  />
      </div>
      <div className="dark:bg-[#24303F] bg-white shadow-lg w-full p-5 rounded-2xl">
        {isLoading ? <div>
          <Skeleton />
        </div> : quizData.quizList[currentIndex] ?
          <div>
            <div>
            </div>
            <div className="">
              <p
                className="text-center text-red-600 dark:text-blue-600 text-3xl font-bold">{quizData.quizList[currentIndex]?.categoryName}</p>
            </div>
            <div>
              {sortQuiz(
                currentIndex + 1,
                quizData.quizList[currentIndex]?.type,
                quizData.quizList[currentIndex]?.optionDtos,
                quizData.quizList[currentIndex]?.name,
                quizData.quizList[currentIndex]?.attachmentIds
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 flex-wrap justify-between mt-5">
              <p>Қолган вақт: {formatTime(remainingTime ? remainingTime : 0)}</p>
              <div className='relative flex justify-start md:justify-center items-center'>
                {isVisibleIndex &&
                  <div className='bg-red-600 absolute w-[17rem] p-5 rounded-xl bottom-11 dark:bg-blue-600 flex flex-wrap gap-2'>
                    {quizData.quizList.map((_, index) => (
                      <div
                        onClick={() => {
                          setCurrentIndex(index);
                          currentIndex !== index && toggleVisibleIndex()
                        }}
                        className={currentIndex === index ? 'w-8 rounded-lg bg-white h-8 border-2 flex justify-center items-center cursor-pointer border-white p-3' : 'w-8 rounded-lg cursor-pointer h-8 border-2 flex justify-center items-center border-white p-3'}
                      >
                        <p className={currentIndex === index ? `text-black` : `text-white`}>{index + 1}</p>
                      </div>
                    ))}
                  </div>
                }
                <div onClick={toggleVisibleIndex} className='bg-red-600 flex items-center justify-center gap-3 py-2 px-4 rounded-xl dark:bg-blue-600'>
                  <p className='text-white'>Саволлар {currentIndex + 1} / {quizData && quizData.quizList.length} </p>
                  {isVisibleIndex ? <IoIosArrowDown className='text-white text-xl' /> : <IoIosArrowUp className='text-white text-xl' />}
                </div>

              </div>
              <div className="flex gap-5">
                <AddButtons disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>
                  Орқага
                </AddButtons>
                <AddButtons
                  onClick={currentIndex + 1 === quizData.quizList.length ? () => {
                    sendResults(id, time === 0 ? 1 : time, quizData.quiz.countAnswers, payload, navigate, setIsBtnLoading, setCurrentIndex, setQuizData);
                  } : handleNextQuestion}
                  disabled={isBtnLoading ? isBtnLoading : isNextDisabled}>{currentIndex + 1 === quizData.quizList.length ? `${isBtnLoading ? 'Юкланмоқда...' : 'Юбориш'}` : 'Кейингиси'}
                </AddButtons>
              </div>

            </div>
          </div>
          :
          <div className="flex justify-center flex-col h-100 items-center">
            <p>Бу туркумда тестлар мавжуд эмас</p>
            <div>
              <Link className="text-blue-600" to={'/client/dashboard'}>Ортга қайтиш</Link>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ClientQuizTest;