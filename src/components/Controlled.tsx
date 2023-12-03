import { useForm } from 'react-hook-form';
import {
  checkPasswordStrength,
  DataPerson,
  userSchema,
} from '../models/models';
import { useAppDispatch } from '../redux/store/hooks';
import { setData } from '../redux/features/dataPersonalSlice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

const Controlled = () => {
  const form = useForm({
    defaultValues: async () => {
      return {
        username: '',
        age: 0,
        email: '',
        firstPassword: '',
        secondPassword: '',
        country: '',
        gender: '',
        download: '',
        agree: false,
      };
    },
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  useEffect(() => {
    const strengthPassword = checkPasswordStrength(password);
    setPasswordStrength(strengthPassword);
  }, [password]);

  const onSubmit = (data: DataPerson) => {
    if (data.download instanceof FileList) {
      const file = data.download[0] as Blob;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        data.download = reader.result as string;
        dispatch(setData(data));
        navigate('/');
      };
    }
  };

  return (
    <>
      <h1>Controlled form</h1>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className={'field'}>
          name:
          <div className={'wrapper-input'}>
            <input className={'input'} type="text" {...register('username')} />
            {errors.username?.message && (
              <p className={'error'}>{errors.username?.message}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          age:
          <div className={'wrapper-input'}>
            <input className={'input'} type="number" {...register('age')} />
            {errors.age?.message && (
              <p className={'error'}>{errors.age?.message}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          email:
          <div className={'wrapper-input'}>
            <input className={'input'} type="email" {...register('email')} />
            {errors.email?.message && (
              <p className={'error'}>{errors.email?.message}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          passwords:
          <div className={'wrapper-input'}>
            <input
              className={'input'}
              type="password"
              autoComplete={'false'}
              {...register('firstPassword')}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="password-strength-indicator"
              style={{ width: `${passwordStrength * 20}%` }}
            ></div>
            {errors.firstPassword?.message && (
              <p className={'error'}>{errors.firstPassword?.message}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          check passwords:
          <div className={'wrapper-input'}>
            <input
              className={'input'}
              type="password"
              autoComplete={'false'}
              {...register('secondPassword')}
            />
            {errors.secondPassword?.message && (
              <p className={'error'}>{errors.secondPassword?.message}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          country:
          <div className={'wrapper-input'}>
            <input className={'input'} type="text" {...register('country')} />
            {errors.country?.message && (
              <p className={'error'}>{errors.country?.message}</p>
            )}
          </div>
        </label>
        <div className={'wrapper-input large'}>
          <span className={'field gender'}>
            <span>gender: </span>
            <div>
              <div className={'radio-wrapper'}>
                <label>
                  man:
                  <input type="radio" value={'man'} {...register('gender')} />
                </label>
                <label>
                  woman:
                  <input type="radio" value={'woman'} {...register('gender')} />
                </label>
              </div>
              {errors.gender?.message && (
                <p className={'error'}>{errors.gender?.message}</p>
              )}
            </div>
          </span>
        </div>
        <label className={'field'}>
          download:
          <div className={'wrapper-input'}>
            <input type="file" {...register('download')} />
            {errors.download?.message && (
              <p className={'error'}>{errors.download?.message}</p>
            )}
          </div>
        </label>
        <label className={'field'}>
          you accept all the rules?
          <div className={'wrapper-input checkbox'}>
            <input type="checkbox" {...register('agree')} />
            {errors.agree?.message && (
              <p className={'error'}>{errors.agree?.message}</p>
            )}
          </div>
        </label>
        <input
          className={'button'}
          type="submit"
          value="Submit"
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export { Controlled };
