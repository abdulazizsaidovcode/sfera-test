import globalStore from '../../common/state-management/globalStore.tsx';
import { api_videos_files } from '../../common/api/api.tsx';
import userIMage from '../../images/avatar.jpg';

const DropdownUser = () => {
  const { getMeData } = globalStore();
  const role = localStorage.getItem('ROLE');

  function roles(param: string | null) {
     if (param === 'ROLE_USER' || param === 'ROLE_STUDENT') return 'Foydanaluvchi';
     else return 'Guest'
  }

  return (
    <div>
      <div
        className="flex items-center gap-4"
      >
          <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-white">
            {getMeData ? getMeData.firstName + ' ' + getMeData.lastName  : roles(role)}
          </span>
            <span className="block text-white text-xs lowercase">
              {roles(role)}
            </span>
        </span>

        <span className="h-12 w-12 rounded-full object-cover overflow-hidden">
          <img
            src={(getMeData && getMeData.fileId)
              ? `${api_videos_files}${getMeData.fileId}`
              : userIMage
            }
            alt="User"
            className={`w-full h-full object-cover`}
          />
        </span>
      </div>
    </div>
  );
};

export default DropdownUser;
