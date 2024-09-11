export const PASSWORD_REGULAR_VALIDATION = {
  code: 400,
  message:
    'Пароль должен включать цифры, заглавные буквы, строчные буквы и специальные символы',
};

export const SORT_FORMAT_VALIDATION = {
  code: 400,
  message:
    'поле sort должно иметь формат "field:ORDER", где ORDER принимает значение "ASC" или "DESC"',
};

export const SEARCH_FORMAT_VALIDATION = {
  code: 400,
  message: 'поле search должно иметь формат "field:value"',
};

export const TASK_NOT_FOUND = {
  code: 404,
  message: 'Задача не найдена',
};

export const USER_CREATED_EARLIER = {
  code: 409,
  message: 'Пользователь с таким email создан ранее',
};

export const USER_NOT_FOUND = {
  code: 404,
  message: 'Пользователь не найден',
};
