# Klan Kodinga

## Описание

Klan Kodinga - это веб-приложение, которое позволяет пользователям просматривать и управлять продуктами, а также добавлять их в избранное и корзину. Приложение построено с использованием React и Redux для управления состоянием.

## Установка

1. Клонируйте репозиторий:

   ```sh
   git clone https://github.com/RinasAlex/klan_kodinga.git
   ```

2. Перейдите в директорию проекта:

   ```sh
   cd klan_kodinga
   ```

3. Установите зависимости:
   ```sh
   npm install
   ```

## Запуск проекта

1. Запустите локальный сервер разработки:

   ```sh
   npm run dev
   ```

2. Откройте браузер и перейдите по адресу:
   ```
   http://localhost:5173/
   ```

## Структура проекта

- `src/components`: Компоненты React, используемые в приложении.
- `src/pages`: Страницы приложения.
- `src/store`: Redux store и слайсы.
- `src/assets`: Статические ресурсы, такие как изображения и стили.

## Основные компоненты

### ProductPage.jsx

Компонент для отображения страницы продукта, включая детали продукта и действия с корзиной.

### Favorites.scss

Стили для страницы избранного.

### PageNotFound.scss

Стили для страницы "Page Not Found".

#### Пример кода из PageNotFound.scss

```scss
@use "@/assets/styles/variables.scss" as nav;

.PageNotFound {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 80px;
  margin-bottom: 80px;
  align-items: center;

  .container {
    &__img {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;

      img {
        // Здесь будут стили для тега img
      }
    }

    &__errorText {
      margin-top: 16px;
      text-align: center;
      font-weight: 500;
      font-size: 20px;
      color: #8b8b8b;
      line-height: 26px; /* Добавлено межстрочное расстояние */
      white-space: normal; /* Позволяет переносу текста */
    }

    &__errorBtn {
      margin-top: 32px;
      // Здесь будут стили для кнопки ошибки
    }
  }
}
```

Вклад
Если вы хотите внести вклад в проект, пожалуйста, создайте форк репозитория, внесите изменения и отправьте pull request.

Лицензия
Этот проект лицензирован под лицензией MIT. Подробности можно найти в файле LICENSE.
