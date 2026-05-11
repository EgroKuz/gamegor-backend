FROM python:3.11-slim

WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    postgresql-client \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Копирование requirements.txt и установка Python-зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода приложения
COPY backend/ ./backend/

# Создание директорий для медиа и статики
RUN mkdir -p /app/media /app/static

# Переменные окружения по умолчанию
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Порт Django приложения
EXPOSE 8000

# Команда запуска
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
