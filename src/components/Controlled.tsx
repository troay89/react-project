import { useForm } from 'react-hook-form';
import { DataPerson } from '../models/models.ts';
import { useAppDispatch } from '../redux/store/hooks.ts';
import { setData } from '../redux/features/dataPersonalSlice.ts';
import { useNavigate } from 'react-router-dom';

const Controlled = () => {
  const form = useForm({
    defaultValues: async () => {
      return {
        username: '',
        age: '',
        email: '',
        firstPassword: '',
        secondPassword: '',
        country: '',
        gender: '',
        download: '',
      };
    },
    mode: 'onSubmit',
  });

  const { register, handleSubmit } = form;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: DataPerson) => {
    if (Array.isArray(data.download)) {
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
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <label className={'field'}>
          name:
          <input
            className={'input'}
            type="text"
            id={'username'}
            {...register('username')}
          />
        </label>
        <label className={'field'}>
          age:
          <input
            className={'input'}
            type="number"
            id={'age'}
            {...register('age')}
          />
        </label>
        <label className={'field'}>
          email:
          <input
            className={'input'}
            type="email"
            id={'email'}
            {...register('email')}
          />
        </label>
        <label className={'field'}>
          passwords:
          <input
            className={'input'}
            type="password"
            id={'firstPassword'}
            autoComplete={'false'}
            {...register('firstPassword')}
          />
        </label>
        <label className={'field'}>
          check passwords:
          <input
            className={'input'}
            type="password"
            autoComplete={'false'}
            id={'secondPassword'}
            {...register('secondPassword')}
          />
        </label>
        <label className={'field'}>
          country:
          <input
            className={'input'}
            type="text"
            id={'country'}
            {...register('country')}
          />
        </label>
        <div className={'field'}>
          <span>gender: </span>
          <label>
            man:
            <input type="radio" value={'man'} {...register('gender')} />
          </label>
          <label>
            woman:
            <input type="radio" value={'woman'} {...register('gender')} />
          </label>
        </div>
        <label className={'field'}>
          download:
          <input type="file" {...register('download')} />
        </label>
        <label className={'field'}>
          вы принимаете все правила?
          <input type="checkbox" name="accept" />
        </label>
        <input className={'button'} type="submit" value="Submit" />
      </form>
    </>
  );
};

export { Controlled };
