import authStore from '../../common/state-management/authStore.tsx';

const CheckboxGender = () => {
  const { gender, setGender } = authStore();
  const handleCheckboxChange = (val: string) => setGender(gender === val ? null : val);
  return (
    <div className="flex">
      <label
        htmlFor="checkboxMale"
        className="flex cursor-pointer select-none items-center mr-4"
      >
        <div className="relative">
          <input
            type="checkbox"
            name={`checkboxMale`}
            id="checkboxMale"
            className="sr-only"
            checked={gender === 'MALE'}
            onChange={() => handleCheckboxChange('MALE')}
          />
          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
              gender === 'MALE' && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                gender === 'MALE' && '!bg-primary'
              }`}
            >
              {' '}
            </span>
          </div>
        </div>
        Эркак
      </label>

      <label
        htmlFor="checkboxFemale"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            name={`checkboxFemale`}
            id="checkboxFemale"
            className="sr-only"
            checked={gender === 'FEMALE'}
            onChange={() => handleCheckboxChange('FEMALE')}
          />
          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
              gender === 'FEMALE' && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                gender === 'FEMALE' && '!bg-primary'
              }`}
            >
              {' '}
            </span>
          </div>
        </div>
        Аёл
      </label>
    </div>
  );
};

export default CheckboxGender;
