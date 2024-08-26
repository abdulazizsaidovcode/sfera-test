export interface ProfileStoreTypes {
    userData: ProfileDataTypes;
    setUserData: (val: ProfileDataTypes) => void
}

export interface ProfileDataTypes {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: any,
    street: string,
    districtName: string,
    regionName: string
    districtId: number | null,
    regionId: number
    fileId: number
}