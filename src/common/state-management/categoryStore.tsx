import { create } from 'zustand';
import { Category, CategoryClientList, CategoryList } from '../../types/category.ts';

const categoryStore = create<Category>((set) => ({
  categoryData: null,
  clientCategoryData: null,
  setCategoryData: (val: null | CategoryList[]) => set({ categoryData: val }),
  setClientCategoryData: (val: null | CategoryClientList[]) => set({ clientCategoryData: val }),
  addValue: {
    name: '',
    description: '',
    questionCount: '',
    extraQuestionCount: '',
    durationTime: '',
    retakeDate: '',
    // easyQuestionCount: '',
    // mediumQuestionCount: '',
    // hardQuestionCount: '',
    fileId: '',
    main: false
  },
  setAddValue: (val: null | CategoryList) => set({ addValue: val }),
}));

export default categoryStore;