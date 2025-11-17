# Etapa 1: PHP + Composer
FROM php:8.2-fpm AS backend

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_mysql zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copiar solo el backend donde está Laravel
WORKDIR /var/www/html
COPY backend/ ./

RUN composer install --optimize-autoloader --no-dev

# Etapa 2: Nginx (servidor web)
FROM nginx:stable

# Copiar configuración básica
COPY backend/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar Laravel ya construido
COPY --from=backend /var/www/html /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
