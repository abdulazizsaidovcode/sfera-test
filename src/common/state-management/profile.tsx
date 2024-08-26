import { create } from 'zustand';
import { ProfileDataTypes, ProfileStoreTypes } from '../../types/profile';

const useProfileStore = create<ProfileStoreTypes>((set) => ({
    userData: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        street: '',
        districtName: '',
        regionName: '',
        fileId: 0,
        regionId: 0,
        districtId: 0
    },
    setUserData: (val: ProfileDataTypes) => set({ userData: val })
}));

export default useProfileStore;