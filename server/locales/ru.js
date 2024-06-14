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
        update: {
          error: 'Не удалось изменить',
          success: 'Пользователь успешно изменён',
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
        update: {
          error: 'Не удалось изменить',
          success: 'Статус успешно изменён',
        },
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        delete: {
          error: 'Не удалось задачу',
          success: 'Задача успешно удалёна',
        },
        update: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменёна',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        delete: {
          error: 'Не удалось метку',
          success: 'Метка успешно удалёна',
        },
        update: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно изменена',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      accessError: 'Вы не можете редактировать или удалять другого пользователя',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
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
        updateStatus: 'Изменить',
        delete: 'Удалить',
        new: {
          submit: 'Создать',
          newStatus: 'Создание статуса',
        },
        update: {
          submit: 'Изменить',
          updateStatus: 'Изменение статуса',
        },
      },
      tasks: {
        id: 'ID',
        nameTask: 'Наименование',
        newTask: 'Создать задачу',
        status: 'Статус',
        author: 'Автор',
        createdAt: 'Дата создания',
        executor: 'Исполнитель',
        actions: 'Действия',
        myTasks: 'Только мои задачи',
        show: 'Показать',
        delete: 'Удалить',
        describe: 'Описание',
        labels: 'Метки',
        new: {
          submit: 'Создать',
          newTasks: 'Создание задачи',
        },
        update: {
          submit: 'Изменить',
          updateTasks: 'Изменение задачи',
        },
      },
      labels: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        createLabel: 'Создать метку',
        labels: 'Метки',
        updateLabel: 'Изменить',
        delete: 'Удалить',
        actions: 'Действия',
        new: {
          submit: 'Создать',
          newLabel: 'Создание метки',
        },
        update: {
          submit: 'Изменить',
          updateLabel: 'Изменение метки',
        },
      },
    },
  },
};
