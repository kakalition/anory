FROM archlinux:latest

RUN pacman-key --init
RUN pacman-db-upgrade
RUN pacman -Syyu --noconfirm

RUN pacman -S php --noconfirm

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /bin/composer

WORKDIR /app

COPY . .
RUN composer install

CMD [ "php",  "artisan", "serve", "--host=0.0.0.0" ]