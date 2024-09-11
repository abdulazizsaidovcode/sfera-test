export interface Category {
  clientCategoryData: null | CategoryClientList[];
  setClientCategoryData: (val: null | CategoryClientList[]) => void;
  categoryData: null | CategoryList[];
  setCategoryData: (val: null | CategoryList[]) => void;
  addValue: null | CategoryList;
  setAddValue: (val: null | any) => void;
}

export interface CategoryList {
  id?: number | string;
  name: string;
  description: string;
  questionCount: number | string;
  extraQuestionCount: number | string;
  durationTime: number | string;
  // easyQuestionCount: number | string;
  // mediumQuestionCount: number | string;
  // hardQuestionCount: number | string;
  retakeDate: number | string;
  main: boolean | string;
  createdBy?: string;
  // updatedBy?: string | null;
  // deletedBy?: string | null;
  fileId: number | string;
}

export interface CategorySelectList {
  categoryId: number
  categoryName: string
}

export interface CategoryClientList {
  id: number,
  name: string,
  description: string,
  countQuiz: number,
  durationTime: number,
  categoryEnum: string,
  active: boolean
}