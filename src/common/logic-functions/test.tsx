import axios from 'axios';
import { config } from '../api/token';
import { TestList, TestMainData } from '../../types/test';
import {
  certificate, question_all_filter,
  question_crud, question_transfer,
  quiz_pass,
  quiz_start
} from '../api/api';
import toast from 'react-hot-toast';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void, setIsLoading: (val: boolean) => void, setTotalTime: (Val: number) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(`${quiz_start}/${id}`, config);
    if (data.data) {
      setQuizData({
        quizList: data.data.questionDtoList,
        quiz: data.data,
        currentQuestionIndex: 0,
        remainingTime: data.data.duration
      });
      setTotalTime(data.data.duration * 60);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setQuizData({
        quizList: [],
        quiz: {
          questionDtoList: [],
          countAnswers: 0,
          duration: 0
        },
        currentQuestionIndex: 0,
        remainingTime: 0
      });
    }
  } catch (err: any) {
    consoleClear();
    toast.error(err.response.data.message);
    setIsLoading(false);
    setQuizData({
      quizList: [],
      quiz: {
        questionDtoList: [],
        countAnswers: 0,
        duration: 0
      },
      currentQuestionIndex: 0,
      remainingTime: 0
    });
  }
};

export const sendResults = async (id: string | undefined, duration: number, payload: any[], navigate: (path: string) => void, setIsLoading: (val: boolean) => void, setCurrentIndex: (val: number) => void, setQuizData: (val: TestMainData) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.post(`${quiz_pass}/${id}?duration=${duration}`, payload, config);
    if (data.data) {
      navigate('/client/quiz/result');
      setIsLoading(false);
      setCurrentIndex(0);
      setQuizData({
        quizList: [],
        quiz: {
          questionDtoList: [],
          countAnswers: 0,
          duration: 0
        },
        currentQuestionIndex: 0,
        remainingTime: 0
      });
      localStorage.removeItem('remainingTime');
      localStorage.removeItem('currentIndex');
    } else setIsLoading(false);
  } catch {
    consoleClear();
    setIsLoading(false);
    toast.error('Илтимос кейинроқ уриниб кўринг');
  }
};

export const getCertificate = async (id: number, setIsLoading: (val: any) => void) => {
  setIsLoading((prev: any) => ({ ...prev, [id]: { ...prev[id], email: true } }));
  try {
    const { data } = await axios.post(`${certificate}/${id}`, {}, config);
    if (data.success) {
      toast.success('Сертификат электрон почтангизга муваффақиятли юборилди');
      consoleClear();
    }
  } catch {
    consoleClear();
  } finally {
    setIsLoading((prev: any) => ({ ...prev, [id]: { ...prev[id], email: false } }));
  }
};

//===================ADMIN=========================
// all get or filter
export const allFilterOrGet = async (setData: (val: null | TestList[]) => void, page: number | string, setTotalPage: (val: number) => void, setLoading: (val: boolean) => void, name?: string, categoryId?: string | number, type?: string) => {
  const queryParams: string = [
    name ? `questionName=${name}` : '',
    categoryId ? `categoryId=${categoryId}` : '',
    type ? `type=${type}` : ''
  ].filter(Boolean).join('&');
  const url: string = `${question_all_filter}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
  setLoading(true);
  try {
    const { data } = await axios.get(url, config);
    if (data.success) {
      setLoading(false);
      setData(data.body.body);
      setTotalPage(data.body.totalElements);
    } else {
      setData(null);
      setLoading(false);
      consoleClear();
    }
  } catch {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};

// test crud function
export const adminTestCrud = async (
  {
    urlType,
    crudData,
    setLoading,
    setResData,
    editOrDeleteID
  }: {
    urlType: string,
    crudData: any,
    setLoading: (val: boolean) => void,
    setResData: (val: boolean) => void,
    editOrDeleteID?: string
  }
) => {
  setLoading(true);
  if (urlType === 'post') {
    try {
      const { data } = await axios.post(question_crud, crudData, config);
      if (data.success) {
        setResData(true);
        setLoading(false);
        toast.success('Тест муваффақиятли сақланди');
      } else {
        toast.error('Тест сақлашда хатолик юз берди');
        setLoading(false);
      }
    } catch {
      consoleClear();
      toast.error('Тест сақлашда хатолик юз берди');
      setLoading(false);
    }
  } else if (urlType === 'put') {
    try {
      if (editOrDeleteID) {
        const { data } = await axios.put(`${question_crud}/${editOrDeleteID}`, {
          name: crudData.name,
          categoryId: crudData.categoryId,
          type: crudData.type,
          difficulty: crudData.difficulty,
          finiteError: crudData.finiteError ? crudData.finiteError : 0,
          attachmentIds: crudData.attachmentIds ? crudData.attachmentIds : [],
          optionDtos: crudData.optionDtos
        }, config);
        if (data.success) {
          setResData(true);
          setLoading(false);
          toast.success('Тест муваффақиятли таҳрирланди');
        } else {
          toast.error('Хатолик юз берди');
          setLoading(false);
        }
      } else {
        consoleClear();
        toast.error('Хатолик юз берди');
        setLoading(false);
      }
    } catch {
      consoleClear();
      toast.error('Хатолик юз берди');
      setLoading(false);
    }
  } else if (urlType === 'delete') {
    try {
      if (editOrDeleteID) {
        const { data } = await axios.delete(`${question_crud}/${editOrDeleteID}`, config);
        if (data.success) {
          consoleClear();
          setResData(true);
          setLoading(false);
          toast.success('Тест муваффақиятли ўчирилди');
        } else {
          consoleClear();
          toast.error('Хатолик юз берди');
          setLoading(false);
        }
      } else {
        consoleClear();
        toast.error('Хатолик юз берди');
        setLoading(false);
      }
    } catch {
      consoleClear();
      toast.error('Хатолик юз берди');
      setLoading(false);
    }
  }
};

export const questionTransfer = async (
  testIds: any[],
  categoryID: any,
  setData: (val: null | TestList[]) => void,
  page: number | string,
  setTotalPage: (val: number) => void,
  setLoading: (val: boolean) => void,
  closeModalTest: () => void
) => {
  try {
    const transferData = {
      questionIds: testIds,
      categoryId: categoryID
    };
    const { data } = await axios.put(question_transfer, transferData, config);
    if (data.success) {
      await allFilterOrGet(setData, page, setTotalPage, setLoading);
      toast.success('Тест муваффақиятли кўчирилди');
      closeModalTest();
    } else {
      toast.error('Тест кўчиришда қандайдир хатолик юз берди');
      closeModalTest();
    }
  } catch (err) {
    closeModalTest();
    toast.error('Тест кўчиришда қандайдир хатолик юз берди');
    consoleClear();
  }
};
