# MFA Сервис

Сервис многофакторной аутентификации (MFA) для системы авторизации. Обрабатывает все операции, связанные с MFA:

## Функционал
- Генерация и проверка TOTP (Time-based One-Time Password)
- Управление резервными кодами
- Процесс подключения MFA
- Процесс верификации MFA
- Безопасное хранение MFA-секретов
- Интеграция с сервисом пользователей

## Технологии
- Node.js
- TypeScript
- Express.js
- TypeORM (для работы с БД)
- JWT (для аутентификации)
- Speakeasy (для генерации/проверки TOTP)
- Генерация QR-кодов

## Установка

### Требования
- Node.js v18+
- npm v9+
- PostgreSQL (или другая СУБД)

### Инструкция
1. Клонировать репозиторий
2. Перейти в директорию mfa-service:
   ```bash
   cd backend/mfa-service
   ```
3. Установить зависимости:
   ```bash
   npm install
   ```
4. Создать файл `.env` на основе `.env.example` (если есть) и настроить переменные окружения

## Конфигурация
Необходимые переменные окружения:

```
# Настройки приложения
PORT=3000
NODE_ENV=development

# База данных
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mfa_service

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# MFA
MFA_ISSUER=YourAppName
```

## API

### Эндпоинты MFA
- `POST /mfa/setup` - Инициализация настройки MFA для пользователя
- `POST /mfa/verify` - Проверка MFA-кода
- `POST /mfa/disable` - Отключение MFA для пользователя
- `GET /mfa/status` - Проверка статуса MFA пользователя
- `POST /mfa/backup-codes` - Генерация новых резервных кодов

## Разработка

### Запуск сервиса
```bash
npm run dev
```

### Сборка проекта
```bash
npm run build
```

### Линтинг
```bash
npm run lint
```

### Форматирование
```bash
npm run format
```

## Тестирование

### Запуск тестов
```bash
npm test
```

### Покрытие тестами
```bash
npm run test:coverage
```

## Деплой

### Продакшен-сборка
```bash
npm run build
```

### Запуск в продакшене
```bash
npm start
```