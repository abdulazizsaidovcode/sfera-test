export interface User {
  resultList: null | ResultArchive[];
  setResultList: (val: ResultArchive[] | null) => void;
}

export interface ResultArchive {
  question: string;
  answer: string[];
  correctAnswer: null | string[];
  correct: boolean;
}