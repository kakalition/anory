FROM nginx:1.22.0-alpine

WORKDIR /var/www/html

# Essential
RUN echo "UTC" > /etc/timezone
RUN apk add --no-cache zip unzip curl supervisor 

# Add bash
RUN apk add bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

# Add PHP 9 dependencies
RUN apk add --no-cache php8 \
  php8-common \
  php8-fpm \
  php8-pdo \
  php8-opcache \
  php8-zip \
  php8-phar \
  php8-iconv \
  php8-cli \
  php8-curl \
  php8-openssl \
  php8-mbstring \
  php8-tokenizer \
  php8-fileinfo \
  php8-json \
  php8-xml \
  php8-xmlwriter \
  php8-simplexml \
  php8-dom \
  php8-pdo_mysql \
  php8-pdo_sqlite \
  php8-pecl-redis 

RUN rm /usr/bin/php
RUN ln -s /usr/bin/php8 /usr/bin/php 

# Install composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN rm -rf composer-setup.php

# Configure supervisor
# RUN mkdir -p /etc/supervisor.d/
# COPY .docker/supervisord.ini /etc/supervisor.d/supervisord.ini

# Configure PHP
RUN mkdir -p /run/php/
RUN touch /run/php/php8.0-fpm.pid

COPY .docker/php-fpm.ini /etc/php8/php-fpm.ini
COPY .docker/php.ini-production /etc/php8/php.ini

# Configure nginx
COPY .docker/nginx.conf /etc/nginx/
COPY .docker/nginx-laravel.conf /etc/nginx/modules/

RUN mkdir -p /run/nginx/
RUN touch /run/nginx/nginx.pid

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stdout /var/log/nginx/error.log

# Build
COPY . .
RUN composer update
RUN composer install --no-dev
RUN chown -R nobody:nobody /var/www/html/storage

RUN php-fpm8 -D
# RUN sed -i 's/listen = 127.0.0.1:9000/listen = 0.0.0.0:9000/' /etc/php8/php-fpm.d/www.conf
EXPOSE 80
CMD ["nginx"]
