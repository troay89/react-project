const Uncontrolled = () => {
  return (
    <>
      <h1 className={'tittle'}>Uncontrolled form</h1>
      <form className={'form'}>
        <label className={'field'}>
          name:
          <input className={'input'} type="text" name="name" />
        </label>
        <label className={'field'}>
          age:
          <input className={'input'} type="number" name="age" />
        </label>
        <label className={'field'}>
          email:
          <input className={'input'} type="email" name="email" />
        </label>
        <label className={'field'}>
          passwords:
          <input
            className={'input'}
            type="password"
            name="passwords"
            autoComplete={'false'}
          />
        </label>
        <label className={'field'}>
          check passwords:
          <input
            className={'input'}
            type="password"
            name="passwords"
            autoComplete={'false'}
          />
        </label>
        <div className={'field'}>
          <span>gender: </span>
          <label>
            man:
            <input type="radio" name="gender" />
          </label>
          <label>
            woman:
            <input type="radio" name="gender" />
          </label>
        </div>
        <label className={'field'}>
          вы принимаете все правила?
          <input type="checkbox" name="accept" />
        </label>
        <label className={'field'}>
          download:
          <input type="file" name="accept" />
        </label>
        <label className={'field'}>
          countries:
          <input className={'input'} type="text" name="countries" />
        </label>
        <input className={'button'} type="submit" value="Submit" />
      </form>
    </>
  );
};

export { Uncontrolled };
