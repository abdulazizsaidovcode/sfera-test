import axios from 'axios';
import { district_all, district_region_filter, getMeUrl, region_all } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const getMe = async (setData: (val: any) => void) => {
  console.log('CONFIG', config);

  try {
    const { data } = await axios.get(getMeUrl, config);
    if (data) setData(data.data);
    else setData(null);
  } catch (error) {
    setData(null);
    console.log('error', error);
  } finally {
    consoleClear();
  }
};

export const getRegions = async (setData: (val: any) => void) => {
  try {
    const { data } = await axios.get(region_all, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch {
    setData(null);
  } finally {
    consoleClear();
  }
};

export const getDistrict = async (setData: (val: any) => void) => {
  try {
    const { data } = await axios.get(district_all, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch {
    setData(null);
  } finally {
    consoleClear();
  }
};

export const getDistrictByRegionId = async (id: number, setData: (val: any) => void) => {
  if (!id) return null;
  try {
    const { data } = await axios.get(`${district_region_filter}/${id}`, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch {
    setData(null);
  } finally {
    consoleClear();
  }
};