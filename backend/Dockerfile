FROM ubuntu:22.10

WORKDIR /var/www/html

# Essential
RUN echo "UTC" > /etc/timezone

# Add PHP 9 dependencies
RUN apt update

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC
RUN apt-get install -y tzdata

RUN apt install -y \
  php8.1 \
  php8.1-common \
  php8.1-fpm \
  php8.1-pdo \
  php8.1-opcache \
  php8.1-zip \
  php8.1-phar \
  php8.1-iconv \
  php8.1-cli \
  php8.1-curl \
  php8.1-mbstring \
  php8.1-tokenizer \
  php8.1-fileinfo \
  php-json \
  php8.1-xml \
  php8.1-xmlwriter \
  php8.1-simplexml \
  php8.1-dom \
  openssl \
  php-redis 

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
  php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
  php composer-setup.php && \
  php -r "unlink('composer-setup.php');" && \
  mv composer.phar /usr/local/bin/composer

RUN apt install zip unzip

# Build
COPY . .
RUN composer update
RUN composer install --no-dev
RUN chown -R www-data:www-data ./storage

RUN php artisan config:clear
RUN php artisan config:cache

RUN sed -i 's/listen = \/run\/php\/php8.1-fpm.sock/listen = 0.0.0.0:9000/' /etc/php/8.1/fpm/pool.d/www.conf

CMD ["./start.sh"]