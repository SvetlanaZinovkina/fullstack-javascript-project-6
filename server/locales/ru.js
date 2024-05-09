// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        delete: {
          error: 'Не удалось удалить',
          success: 'Пользователь успешно удалён',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        delete: {
          error: 'Не удалось удалить',
          success: 'Статус успешно удалён',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      accessError: 'Вы не можете редактировать или удалять другого пользователя',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        tasks: 'Метки',
        labels: 'Задачи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        update: 'Изменение пользователя',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          email: 'Email',
          submit: 'Войти',
          password: 'Пароль',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        firstName: 'Имя',
        lastName: 'Фамилия',
        password: 'Пароль',
        fullName: 'Полное имя',
        createdAt: 'Дата создания',
        actions: 'Действия',
        update: 'Изменить',
        delete: 'Удалить',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
      },
      welcome: {
        index: {
          hello: 'Добро пожаловать в менеджер задач!',
          description: 'Сервис для управления временем',
          more: 'Присоединиться',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        createStatus: 'Создать статус',
        statuses: 'Статусы',
        update: 'Изменить',
        delete: 'Удалить',
        new: {
          submit: 'Создать',
          newStatus: 'Создание статуса',
        },
      },
    },
  },
};
