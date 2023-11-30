import { FormEvent, useRef } from 'react';
import { DataPerson } from '../models/models.ts';
import { setData } from '../redux/features/dataPersonalSlice.ts';
import { useAppDispatch } from '../redux/store/hooks.ts';
import { useNavigate } from 'react-router-dom';

const Uncontrolled = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstPasswordRef = useRef<HTMLInputElement>(null);
  const secondPasswordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const genderManRef = useRef<HTMLInputElement>(null);
  const genderWomanRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('download:', downloadRef.current?.files);
    const dataPerson: DataPerson = {
      username: usernameRef?.current?.value ?? '',
      age: ageRef?.current?.value ?? '',
      email: emailRef?.current?.value ?? '',
      firstPassword: firstPasswordRef?.current?.value ?? '',
      secondPassword: secondPasswordRef?.current?.value ?? '',
      country: countryRef?.current?.value ?? '',
      gender: genderWomanRef ? 'woman' : 'man',
      download: downloadRef?.current?.files![0] ?? '',
    };
    const file = dataPerson.download as Blob;
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      dataPerson.download = reader.result as string;
      dispatch(setData(dataPerson));
      navigate('/');
    };
  };

  return (
    <>
      <h1 className={'tittle'}>Uncontrolled form</h1>
      <form className={'form'} onSubmit={handleSubmit}>
        <label className={'field'}>
          name:
          <input className={'input'} type="text" ref={usernameRef} />
        </label>
        <label className={'field'}>
          age:
          <input className={'input'} type="number" ref={ageRef} />
        </label>
        <label className={'field'}>
          email:
          <input className={'input'} type="email" ref={emailRef} />
        </label>
        <label className={'field'}>
          passwords:
          <input
            className={'input'}
            type="password"
            name="passwords"
            autoComplete={'false'}
            ref={firstPasswordRef}
          />
        </label>
        <label className={'field'}>
          check passwords:
          <input
            className={'input'}
            type="password"
            name="passwords"
            autoComplete={'false'}
            ref={secondPasswordRef}
          />
        </label>
        <label className={'field'}>
          countries:
          <input
            className={'input'}
            type="text"
            name="countries"
            ref={countryRef}
          />
        </label>
        <div className={'field'}>
          <span>gender: </span>
          <label>
            man:
            <input
              type="radio"
              value={'man'}
              name="gender"
              ref={genderManRef}
            />
          </label>
          <label>
            woman:
            <input
              type="radio"
              value={'woman'}
              name="gender"
              ref={genderWomanRef}
            />
          </label>
        </div>
        <label className={'field'}>
          download:
          <input type="file" name="download" ref={downloadRef} />
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

export { Uncontrolled };
