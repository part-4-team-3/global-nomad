import REGEX from './regex';

const FORM_OPTIONS = {
  email: {
    name: 'email' as const,
    placeholder: '이메일을 입력해 주세요.',
    rules: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: REGEX.email,
        message: '올바른 이메일 주소가 아닙니다.',
      },
    },
  },
  loginPassword: {
    name: 'password' as const,
    placeholder: '비밀번호를 입력해 주세요',
    rules: {
      required: '비밀번호를 입력해 주세요.',
    },
  },
  password: {
    name: 'password' as const,
    placeholder: '비밀번호를 입력해 주세요',
    rules: {
      required: '비밀번호를 입력해 주세요.',
      pattern: {
        value: REGEX.password,
        message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
      },
    },
  },
  passwordCheck: {
    name: 'passwordCheck' as const,
    placeholder: '비밀번호와 일치하는 값을 입력해 주세요.',
    rules: {
      required: '비밀번호를 입력해 주세요.',
    },
    validateMsg: '비밀번호가 일치하지 않습니다.',
  },
  nickName: {
    name: 'nickName' as const,
    placeholder: '닉네임을 입력해 주세요',
    rules: {
      required: '닉네임을 입력해 주세요.',
    },
  },
  emailValidate: {
    placeholder: '인증번호를 입력해 주세요',
  },
  errorMsgStyle: 'text-red-500 text-14pxr mt-8pxr',
};

export default FORM_OPTIONS;
