import { FormEvent, useRef, useState } from 'react';
import { DataPerson } from '../models/models.ts';
import { setData } from '../redux/features/dataPersonalSlice.ts';
import { useAppDispatch } from '../redux/store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { object, string, number, mixed, boolean } from 'yup';

const FILE_SIZE = 20000 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const userSchema = object().shape({
  username: string()
    .required('Username is required')
    .test(
      'is-capital',
      'Username must start with a capital letter',
      (value) => {
        if (!value) return true;
        const firstLetter = value.charAt(0);
        return firstLetter === firstLetter.toUpperCase();
      }
    ),
  age: number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: string()
    .required('email is required')
    .email('Email must be a valid email address'),
  firstPassword: string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  secondPassword: string()
    .required('Password confirmation is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.firstPassword === value;
    }),
  country: string().required('Country is required'),
  gender: string().required('Gender is required'),
  download: mixed()
    .required('A file is required')
    .test('isFileUploaded', 'No file uploaded', (value) => {
      return value instanceof File;
    })
    .test('fileSize', 'File too large', (value) => {
      if (!(value instanceof File)) return true;
      return value.size <= FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (!(value instanceof File)) return true;
      return SUPPORTED_FORMATS.includes(value.type);
    }),
  agree: boolean()
    .required('to continue')
    .oneOf([true], 'You must agree to continue'),
});

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const dataPerson: DataPerson = {
      username: refs.username.current?.value ?? '',
      age: refs.age.current?.value ?? '',
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
            />
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
        <label className={'field'}>
          countries:
          <div className={'wrapper-input'}>
            <input
              className={'input'}
              type="text"
              name="countries"
              ref={refs.country}
            />
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
          вы принимаете все правила?
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
