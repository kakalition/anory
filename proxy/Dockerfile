FROM ubuntu:22.10

RUN apt update && \
  apt install -y nginx

# Configure nginx
COPY .docker/default /etc/nginx/sites-available/default
COPY ./start.sh /bin/

CMD [ "./bin/start.sh" ]
# RUN ln -sf /dev/stdout /var/log/nginx/access.log
# RUN ln -sf /dev/stdout /var/log/nginx/error.log