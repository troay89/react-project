import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  checkPasswordStrength,
  DataPerson,
  userSchema,
} from '../models/models';
import { setData } from '../redux/features/dataPersonalSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const Uncontrolled = () => {
  const refs = {
    username: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    firstPassword: useRef<HTMLInputElement>(null),
    secondPassword: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    genderMan: useRef<HTMLInputElement>(null),
    genderWoman: useRef<HTMLInputElement>(null),
    download: useRef<HTMLInputElement>(null),
    agree: useRef<HTMLInputElement>(null),
  };

  const countries = useAppSelector((state) => state.countryList);
  const [input, setInput] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input, countries]);

  useEffect(() => {
    const strengthPassword = checkPasswordStrength(password);
    setPasswordStrength(strengthPassword);
  }, [password]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const dataPerson: DataPerson = {
      username: refs.username.current?.value ?? '',
      age: Number(refs.age.current?.value) ?? 0,
      email: refs.email.current?.value ?? '',
      firstPassword: refs.firstPassword.current?.value ?? '',
      secondPassword: refs.secondPassword.current?.value ?? '',
      country: refs.country.current?.value ?? '',
      gender: refs.genderWoman.current?.checked
        ? 'woman'
        : refs.genderMan?.current?.checked
          ? 'man'
          : '',
      download: refs.download.current?.files?.[0] ?? '',
      agree: refs.agree?.current?.checked ?? false,
    };

    try {
      userSchema.validateSync(dataPerson, { abortEarly: false });
      setErrors({});
      const file = dataPerson.download as Blob;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        dataPerson.download = reader.result as string;
        dispatch(setData(dataPerson));
        navigate('/');
      };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages: Record<string, string> = {};
        for (const err of error.inner) {
          errorMessages[err.path as string] = err.message;
        }
        setErrors(errorMessages);
      }
    }
  };

  return (
    <>
      <h1 className={'tittle'}>Uncontrolled form</h1>
      <form className={'form'} onSubmit={handleSubmit} noValidate>
        <label className={'field'}>
          name:
          <div className={'wrapper-input'}>
            <input className={'input'} type="text" ref={refs.username} />
            {errors.username && <p className={'error'}>{errors.username}</p>}
          </div>
        </label>
        <label className={'field'}>
          age:
          <div className={'wrapper-input'}>
            <input className={'input'} type="number" ref={refs.age} />
            {errors.age && <p className={'error'}>{errors.age}</p>}
          </div>
        </label>
        <label className={'field'}>
          email:
          <div className={'wrapper-input'}>
            <input className={'input'} type="email" ref={refs.email} />
            {errors.email && <p className={'error'}>{errors.email}</p>}
          </div>
        </label>
        <label className={'field'}>
          passwords:
          <div className={'wrapper-input'}>
            <input
              className={'input'}
              type="password"
              name="passwords"
              autoComplete={'false'}
              ref={refs.firstPassword}
              onChange={() => {
                setPassword(refs.firstPassword.current?.value ?? '');
              }}
            />
            <div
              className="password-strength-indicator"
              style={{ width: `${passwordStrength * 20}%` }}
            ></div>
            {errors.firstPassword && (
              <p className={'error'}>{errors.firstPassword}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          check passwords:
          <div className={'wrapper-input'}>
            <input
              className={'input'}
              type="password"
              name="passwords"
              autoComplete={'false'}
              ref={refs.secondPassword}
            />
            {errors.secondPassword && (
              <p className={'error'}>{errors.secondPassword}</p>
            )}
          </div>
        </label>
        <label className={'field'} htmlFor="countries">
          countries:
          <div className={'wrapper-input'}>
            <input
              className={'input'}
              type="text"
              id="countries"
              name="countries"
              ref={refs.country}
              value={input}
              onChange={() => setInput(refs.country.current?.value ?? '')}
            />
            {input && (
              <div className="autocomplete">
                {filteredCountries.map((country, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setInput(country);
                      if (refs.country.current) {
                        refs.country.current.value = country;
                      }
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
            {errors.country && <p className={'error'}>{errors.country}</p>}
          </div>
        </label>
        <div className={'wrapper-input large'}>
          <span className={'field gender'}>
            <span>gender: </span>
            <div>
              <div className={'radio-wrapper'}>
                <label>
                  man:
                  <input
                    type="radio"
                    value={'man'}
                    name="gender"
                    ref={refs.genderMan}
                  />
                </label>
                <label>
                  woman:
                  <input
                    type="radio"
                    value={'woman'}
                    name="gender"
                    ref={refs.genderWoman}
                  />
                </label>
              </div>
              {errors.gender && <p className={'error'}>{errors.gender}</p>}
            </div>
          </span>
        </div>
        <label className={'field'}>
          download:
          <div className={'wrapper-input'}>
            <input type="file" name="download" ref={refs.download} />
            {errors.download && <p className={'error'}>{errors.download}</p>}
          </div>
        </label>
        <label className={'field'}>
          you accept all the rules?
          <div className={'wrapper-input checkbox'}>
            <input type="checkbox" ref={refs.agree} />
            {errors.agree && <p className={'error'}>{errors.agree}</p>}
          </div>
        </label>
        <input className={'button'} type="submit" value="Submit" />
      </form>
    </>
  );
};

export { Uncontrolled };
