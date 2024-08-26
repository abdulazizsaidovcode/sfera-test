import axios from "axios";
import { config } from "../api/token";
import { consoleClear } from "../console-clear/console-clear";
import { district_all, region_all } from "../api/api";
import { DistricsType, RegionsType } from "../../types/address";
import toast from "react-hot-toast";

export const getRegions = async (setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get(region_all, config);
        if (data.success) {
            setRegions(data.body);
            setIsLoading(false);
            consoleClear();
        } else {
            setRegions([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setRegions([]);
        setIsLoading(false);
        consoleClear();
    }
};

export const getDistrics = async (setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get(district_all, config);
        if (data.success) {
            setDistrics(data.body);
            setIsLoading(false);
            consoleClear();
        } else {
            setDistrics([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setDistrics([]);
        setIsLoading(false);
        consoleClear();
    }
};

export const addRegion = async (setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void, name: string, toggleDistrictModal: () => void) => {
    if (!name.trim()) {
        toast.error("Исм бўш бўлиши мумкин эмас");
        return;
    }

    setIsLoading(true);
    try {
        const { data } = await axios.post(region_all, { name }, config);
        if (data.success) {
            getRegions(setRegions, setIsLoading)
            consoleClear();
            toast.success("Вилоят муваффақиятли қўшилди");
            toggleDistrictModal()
        } else {
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setIsLoading(false);
        consoleClear();
    }
};

export const addDistrict = async (name: string, regionId: number, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleDistrictModal: () => void) => {
    if (!name.trim() && !regionId) {
        toast.error("Исм ва вилоятни киритинг");
        return;
    }

    setIsLoading(true);
    try {
        const { data } = await axios.post(district_all, { name, regionId }, config);
        if (data.success) {
            getDistrics(setDistrics, setIsLoading)
            consoleClear();
            toast.success("Туман муваффақиятли қўшилди");
            toggleDistrictModal()
        } else {
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setIsLoading(false);
        consoleClear();
    }
};

export const deleteRegion = async (id: number, setRegions: (val: RegionsType[]) => void, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleDeleteRegionModal: () => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.delete(`${region_all}/${id}`, config);
        if (data.success) {
            getRegions(setRegions, setIsLoading)
            getDistrics(setDistrics, setIsLoading)
            consoleClear();
            toast.success("Вилоят муваффақиятли ўчирилди");
            toggleDeleteRegionModal()
        } else {
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setIsLoading(false);
        consoleClear();
    }
};

export const deleteDistrict = async (id: number, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleDeleteRegionModal: () => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.delete(`${district_all}/${id}`, config);
        if (data.success) {
            getDistrics(setDistrics, setIsLoading)
            toggleDeleteRegionModal()
            toast.success("Туман муваффақиятли ўчирилди");
            consoleClear();
        } else {
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setIsLoading(false);
        consoleClear();
    }
};

export const updateRegion = async (id: number, name: string, setRegions: (val: RegionsType[]) => void, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleEditRegionModal: () => void) => {
    if (!name.trim()) {
        toast.error("Исм бўш бўлиши мумкин эмас");
        return;
    }

    setIsLoading(true);
    try {
        const { data } = await axios.put(`${region_all}/${id}`, { name }, config);
        if (data.success) {
            getRegions(setRegions, setIsLoading)
            getDistrics(setDistrics, setIsLoading)
            consoleClear();
            toast.success("Вилоят муваффақиятли ўзгартирилди");
            toggleEditRegionModal()
        } else {
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setIsLoading(false);
        consoleClear();
    }
};

export const updateDistrict = async (id: number, name: string, regionId: number, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleEditDistrictModal: () => void) => {
    if (!name.trim() && !regionId) {
        toast.error("Исм ва вилоятни киритинг");
        return;
    }

    setIsLoading(true);
    try {
        const { data } = await axios.put(district_all, { id, name, regionId }, config);
        if (data.success) {
            getDistrics(setDistrics, setIsLoading)
            consoleClear();
            toast.success("Туман муваффақиятли ўзгартирилди");
            toggleEditDistrictModal()
        } else {
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setIsLoading(false);
        consoleClear();
    }
};