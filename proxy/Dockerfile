FROM ubuntu:22.10

RUN apt update && \
  apt install -y nginx

# Configure nginx
COPY .docker/api /etc/nginx/sites-available/api
RUN ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/api
COPY .docker/web /etc/nginx/sites-available/web
RUN ln -s /etc/nginx/sites-available/web /etc/nginx/sites-enabled/web
COPY ./start.sh /bin/

CMD [ "./bin/start.sh" ]
# RUN ln -sf /dev/stdout /var/log/nginx/access.log
# RUN ln -sf /dev/stdout /var/log/nginx/error.log