import { boolean, mixed, number, object, string } from 'yup';

interface DataPerson {
  username: string;
  age: number;
  email: string;
  firstPassword: string;
  secondPassword: string;
  country: string;
  gender: string;
  download: string | FileList | Blob;
  agree: boolean;
}

const FILE_SIZE = 1000 * 1024;
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
  download: mixed<string | Blob | FileList>()
    .required('A file is required')
    .test('isFileUploaded', 'No file uploaded', (value) => {
      return (
        value instanceof Blob ||
        (value instanceof FileList && value.length === 1)
      );
    })
    .test('fileSize', 'File too large', (value) => {
      if (!(value instanceof Blob) && !(value instanceof FileList)) return true;
      if (value instanceof FileList) {
        return Array.from(value).every((file) => file.size <= FILE_SIZE);
      }
      return value.size <= FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (!(value instanceof Blob) && !(value instanceof FileList)) return true;
      if (value instanceof FileList) {
        return Array.from(value).every((file) =>
          SUPPORTED_FORMATS.includes(file.type)
        );
      }
      return SUPPORTED_FORMATS.includes(value.type);
    }),
  agree: boolean()
    .required('to continue')
    .oneOf([true], 'You must agree to continue'),
});

const checkPasswordStrength = (password: string) => {
  console.log(password);
  let strength = 0;
  const criteria = [/.{8,}/, /[A-Z]+/, /[a-z]+/, /[0-9]+/, /[^A-Za-z0-9]+/];
  criteria.forEach((criterion) => {
    if (criterion.test(password)) strength++;
  });

  return strength;
};

export { userSchema, checkPasswordStrength };
export type { DataPerson };
