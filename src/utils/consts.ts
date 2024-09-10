export const PASSWORD_REGULAR_VALIDATION = {
  code: 400,
  message:
    'Пароль должен включать цифры, заглавные буквы, строчные буквы и специальные символы',
};

export const USER_CREATED_EARLIER = {
  code: 409,
  message: 'Пользователь с таким email создан ранее',
};

export const USER_NOT_FOUND = {
  code: 404,
  message: 'Пользователь не найден',
};
