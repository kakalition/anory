FROM alpine:3.16

WORKDIR /var/www/html

RUN cat > /etc/apk/repositories << EOF; $(echo) \
http://dl-cdn.alpinelinux.org/alpine/v3.16/main/ \
http://dl-cdn.alpinelinux.org/alpine/v3.16/community/ \
EOF

RUN apk update 

ADD https://php.hernandev.com/key/php-alpine.rsa.pub /etc/apk/keys/php-alpine.rsa.pub

RUN apk --update-cache add ca-certificates && \
  echo "https://php.hernandev.com/v3.15/php-8.1" >> /etc/apk/repositories

# Essential
RUN echo "UTC" > /etc/timezone
RUN apk add --no-cache zip unzip curl supervisor 

# Add bash
RUN apk add bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

# Add PHP 9 dependencies
RUN apk add --update-cache php \
  php-common \
  php-fpm \
  php-pdo \
  php-opcache \
  php-zip \
  php-phar \
  php-iconv \
  php-cli \
  php-curl \
  php-openssl \
  php-mbstring \
  php-tokenizer \
  php-fileinfo \
  php-json \
  php-xml \
  php-xmlwriter \
  php-simplexml \
  php-dom \
  php-pdo_mysql \
  php-pdo_sqlite \
  php8-pecl-redis 

# RUN rm /usr/bin/php
# RUN ln -s /usr/bin/php81 /usr/bin/php 

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
  php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
  php composer-setup.php && \
  php -r "unlink('composer-setup.php');" && \
  mv composer.phar /usr/local/bin/composer

# Configure supervisor
# RUN mkdir -p /etc/supervisor.d/
# COPY .docker/supervisord.ini /etc/supervisor.d/supervisord.ini

# Configure PHP
RUN mkdir -p /run/php/
RUN touch /run/php/php8.0-fpm.pid

COPY .docker/php-fpm.ini /etc/php8/php-fpm.ini
COPY .docker/php.ini-production /etc/php8/php.ini

# Configure nginx
# COPY .docker/nginx.conf /etc/nginx/
# COPY .docker/nginx-laravel.conf /etc/nginx/modules/

# RUN mkdir -p /run/nginx/
# RUN touch /run/nginx/nginx.pid

# RUN ln -sf /dev/stdout /var/log/nginx/access.log
# RUN ln -sf /dev/stdout /var/log/nginx/error.log

# Build
COPY . .
RUN composer update
RUN composer install --no-dev
RUN chown -R nobody:nobody /var/www/html/storage

RUN sed -i 's/listen = 127.0.0.1:9000/listen = 0.0.0.0:9000/' /etc/php8/php-fpm.d/www.conf
CMD ["php-fpm8", "-F"]
