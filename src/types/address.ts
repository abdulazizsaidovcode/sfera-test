export interface AddressStoreTypes {
    regions: RegionsType[];
    setRegions: (val: RegionsType[]) => void;
    districs: DistricsType[];
    setDistrics: (val: DistricsType[]) => void;
    isRegionModal: boolean;
    setIsRegionModal: (val: boolean) => void;
    isDeleteRegionModal: boolean;
    setIsDeleteRegionModal: (val: boolean) => void;
    isEditRegionModal: boolean;
    setIsEditRegionModal: (val: boolean) => void;
    isEditDistrictModal: boolean;
    setIsEditDistrictModal: (val: boolean) => void;
    isDeleteDistricModal: boolean;
    setIsDeleteDistricModal: (val: boolean) => void;
    isDistrictModal: boolean;
    setIsDistrictModal: (val: boolean) => void;
    name: string;
    setName: (val: string) => void;
    id: number;
    setId: (val: number) => void;
    regionId: number;
    setRegionId: (val: number) => void;
}

export interface DistricsType {
    id: number,
    name: string
    regionId: number,
    regionName: string,
}

export interface RegionsType {
    id: number,
    name: string
}