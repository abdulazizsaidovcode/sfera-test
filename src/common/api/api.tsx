// swagger url => base
const base_url: string = 'http://161.35.214.247:8080/';
// const base_url: string = 'http://192.168.0.116:8080/';

// ESLATMA: URL OXRIDA => / QUYILGAN BULSA YOKI ID KETADI YOKI TEXT YANI SEARCHLAR UCHUN

// ==================================GET ME==================================
export const getMeUrl: string = `${base_url}user/get/me`;

// admin add or get
export const getAdminList: string = `${base_url}user/get/admin/list`;
export const addAdmin: string = `${base_url}auth/save/admin`;
export const adminIsActives: string = `${base_url}user/active/`;

// =====================USER ========================
export const user_list: string = `${base_url}user`;
export const user_test_active: string = `${base_url}user/access-to/`;

//=================RESULT CONTROLLER====================
export const result_get_all: string = `${base_url}result/results/`; //PAGINATION buladi bu api va yana bittasi detailni kurish uchun  xam ishlatiladi
export const result_one_get: string = `${base_url}result/get-one/`; //PAGINATION buladi bu api va yana bittasi detailni kurish uchun  xam ishlatiladi
export const result_archive: string = `${base_url}result/resultByArchive/`; // archive id kirib keladi
export const result_status_edit: string = `${base_url}result/update-status/`; // status edit id kirib keladi
export const result_date_edit: string = `${base_url}result/update/expiredDate`; // status edit id kirib keladi

//=================REGION CONTROLLER==================== 
export const region_all: string = `${base_url}region`; // regin crud url

//==============DISTRICT CONTROLLER========================== 
export const district_all: string = `${base_url}district`; // all district crud
export const district_region_filter: string = `${base_url}district/districts`; // districtni region lar id buyicha get qilish

//=================QUESTION CONTROLLER===================
export const question_crud: string = `${base_url}question`; //admin question crud
export const question_all_filter: string = `${base_url}question/filter`; //admin category buyicha question get qiladi
export const question_transfer: string = `${base_url}question/categoryUpdate`; //admin category buyicha question get qiladi

//================CONTACT CONTROLLER====================== ishlatilmagan
// export const contact_all: string = `${base_url}contact`; //all contact ni get qilish shu yulni uzidan edit xam qilsa buladi va add xam
// export const contact_one: string = `${base_url}contact/`; //bitta contact ni get qilish id keladi va delete qilsa xam buladi

//================CATEGORY CONTROLLER======================
export const category_all: string = `${base_url}category`; // all catygory client and admin get save update qilish uchun
export const category_admin: string = `${base_url}category/list`; // all catygory client and admin get save update qilish uchun
export const category_admin_page: string = `${base_url}category/page`; // all catygory client and admin get save update qilish uchun
export const category_MAIN: string = `${base_url}category/main`; // Admin catycoryning asosiy savolarini get qilishi uchun

//================AUTH CONTROLLER======================
export const auth_reset_password: string = `${base_url}auth/reset-password`; //parolni qayta tiklash
export const auth_forgot_password: string = `${base_url}auth/forgot-password`; //parolni unitish
export const auth_activate: string = `${base_url}auth/activate`; //?????? bilmadim
export const auth_register: string = `${base_url}auth/register`; //user register
export const auth_login: string = `${base_url}auth/login`; //login

//================VIDEO UPLOAD CONTROLLER====================== 
export const api_videos_upload: string = `${base_url}api/videos/upload`; // Video apload qilish admin busa kere
export const api_videos_files: string = `${base_url}api/videos/files/`; // video get qilish client uchun busa kerak
export const api_videos_files_update: string = `${base_url}api/videos/update/`; // video update qilish c
export const api_videos_delete: string = `${base_url}api/videos/delete/`; // video delete qilish Id bilan

//================QUIZ CONTROLLER======================
export const quiz_pass: string = `${base_url}quiz/pass`; // Client Testni Submit qilishi uchun
export const quiz_start: string = `${base_url}quiz/start/`; // Client Testni Boshlash uchun qilishi uchun

//================CERTIFICATE CONTROLLER======================
export const get_certificate_id: string = `${base_url}certificate/certificate-get`; // Client result olishi uchun
export const get_certificate: string = `${base_url}api/videos/files`; // Client result olishi uchun
export const certificate: string = `${base_url}certificate`; // Client result olishi uchun

//================USER PROFILE====================== 
export const user_profile: string = `${base_url}user/profile`; // Client ma'lumotlari
export const user_profile_update: string = `${base_url}user/update/`; // Client ma'lumotlari

//================STATISTICS CONTROLLER======================
export const statistics_day: string = `${base_url}statistic/dayOfWeek/`; // Client result olishi uchun
export const statistics_card: string = `${base_url}statistic/counts/`; // Client result olishi uchun
export const statistics_client: string = `${base_url}statistic/user-dashboard/`; // Client result olishi uchun
export const statistics_card_all: string = `${base_url}statistic/filter/`; // Client result olishi uchun all