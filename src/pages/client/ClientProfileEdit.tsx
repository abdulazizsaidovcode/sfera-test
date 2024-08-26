import { DatePicker, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import AddButtons from '../../components/buttons/buttons'
import { getUserData, updateUserData } from '../../common/logic-functions/profile'
import useProfileStore from '../../common/state-management/profile'
import globalStore from '../../common/state-management/globalStore'
import { getDistrictByRegionId, getRegions } from '../../common/global-functions'
import { RiPencilFill } from "react-icons/ri";
import moment from 'moment'
import PendingLoader from '../../common/Loader/pending-loader'
import { api_videos_files } from '../../common/api/api'
import userIMage from '../../images/user.jpg'
import { checkImgUpload } from '../../components/test-crud-check'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ClientProfileEdit: React.FC = () => {
    const { userData, setUserData } = useProfileStore();
    const { isLoading, setIsLoading, region, district, setDistrict, setRegion } = globalStore()
    const [isFormValid, setIsFormValid] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [attachmentId, setAttachmentId] = useState(0);


    useEffect(() => {
        getUserData(setUserData, setIsLoading);
    }, []);

    useEffect(() => {
        getDistrictByRegionId(userData.regionId, setDistrict);
    }, [userData.regionId]);

    useEffect(() => {
        getRegions(setRegion);
    }, []);

    useEffect(() => {
        validateForm();
    }, [userData]);

    const handleUpdate = () => {
        updateUserData(userData, attachmentId ? attachmentId : userData.fileId, setUserData, setIsLoading);
    };

    const validateForm = () => {
        const isValid =
            userData.firstName &&
            userData.lastName &&
            userData.districtId &&
            userData.regionId &&
            userData.email &&
            userData.street &&
            userData.phoneNumber &&
            userData.dateOfBirth;
        setIsFormValid(isValid);
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const uploadedIMage = await checkImgUpload(file);
            setAttachmentId(uploadedIMage)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('imageUploadInput')?.click();
    };

    return (
        <div className="container mx-auto px-4 mt-4">
            {isLoading && (<PendingLoader />)}
            <div className="">
                <div className="w-full mb-4">
                    <div className="bg-white dark:bg-[#24303F] shadow-md flex justify-center items-center flex-col rounded-lg p-4">
                        <h2 className="text-2xl text-center text-red-600 dark:text-blue-600 font-medium mb-4">Профил расми</h2>
                        <div className="relative">
                            <LazyLoadImage
                                effect="blur"
                                className="rounded-full object-cover h-40 w-40 mb-4"
                                src={userData.fileId ? imagePreviewUrl ? imagePreviewUrl : api_videos_files + userData.fileId : userIMage}
                                alt="Your profile image"
                            />
                            <div onClick={handleUploadClick} className='absolute dark:bg-blue-600 bg-red-600 cursor-pointer p-2 rounded-full bottom-3 right-3'>
                                <RiPencilFill className='text-white text-xl' />
                                <input
                                    id="imageUploadInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="bg-white dark:bg-[#24303F] shadow-md rounded-lg p-4">
                        <h2 className="text-2xl text-center text-red-600 dark:text-blue-600 font-medium mb-4">Ҳисоб тафсилотлари</h2>
                        <form>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputFirstName">
                                        Исм
                                    </label>
                                    <Input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputFirstName"
                                        type="text"
                                        placeholder="Исмингизни киритинг"
                                        value={userData?.firstName}
                                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputLastName">
                                        Фамилия
                                    </label>
                                    <Input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputLastName"
                                        type="text"
                                        placeholder="Фамилиянгизни киритинг"
                                        value={userData?.lastName}
                                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2 mb-4">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputRegionName">
                                        Вилоят
                                    </label>
                                    <Select
                                        id='inputRegionName'
                                        placeholder={`Вилоятингизни танланг`}
                                        className='w-full rounded h-12'
                                        value={userData.regionId ? userData.regionId : null}
                                        onChange={(e) => {
                                            setUserData({ ...userData, regionId: e, districtId: null })
                                        }}

                                    >
                                        {region && region.map(item => (
                                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputDistrictName">
                                        Туман
                                    </label>
                                    <Select
                                        id='inputDistrictName'
                                        placeholder={`Туманингизни танланг`}
                                        className={`w-full rounded h-12`}
                                        value={userData.districtId ? userData.districtId : null}
                                        onChange={(e) => setUserData({ ...userData, districtId: +e })}
                                    >
                                        {district && district.map(item => (
                                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2 mb-4">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputEmail">
                                        Э-почта манзили
                                    </label>
                                    <Input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputEmail"
                                        type="email"
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        placeholder="Электрон почта манзилингизни киритинг"
                                        value={userData?.email}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputStreet">
                                        Кўча
                                    </label>
                                    <Input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputStreet"
                                        type="text"
                                        onChange={(e) => setUserData({ ...userData, street: e.target.value })}
                                        placeholder="Кўчангизга киринг"
                                        value={userData?.street}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2 mb-4">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputPhone">
                                        Телефон рақами
                                    </label>
                                    <Input
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputPhone"
                                        type="tel"
                                        onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                                        placeholder="Телефон рақамингизни киритинг"
                                        value={userData.phoneNumber ? userData.phoneNumber : '+998'}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="text-sm mb-1 block" htmlFor="inputBirthday">
                                        Туғилган кун
                                    </label>
                                    <DatePicker
                                        className="w-full p-3 border border-gray-300 rounded"
                                        id="inputBirthday"
                                        placeholder='Туғилган кунингизни киринг'
                                        onChange={(date) => setUserData({ ...userData, dateOfBirth: `${date.year()}-${date.month() + 1 > 0 && date.month() + 1 < 10 ? `0${date.month() + 1}` : date.month() + 1}-${date.date() > 0 && date.date() < 10 ? `0${date.date()}` : date.date()}` })}
                                        value={userData.dateOfBirth ? moment(userData.dateOfBirth, "YYYY-MM-DD") : null}
                                    />
                                </div>
                            </div>
                            <div>
                                <AddButtons onClick={handleUpdate} disabled={!isFormValid}>
                                    Ўзгаришларни сақланг
                                </AddButtons>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientProfileEdit;
