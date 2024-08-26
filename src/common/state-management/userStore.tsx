import { create } from 'zustand';
import { ResultArchive, User } from '../../types/user.ts';

const userStore = create<User>((set) => ({
  resultList: null,
  setResultList: (val: null | ResultArchive[]) => set({ resultList: val })
}));

export default userStore;