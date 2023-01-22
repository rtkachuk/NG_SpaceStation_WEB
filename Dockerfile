FROM nginx
COPY nginx-entrypoint.sh /bin/
RUN chmod +x /bin/nginx-entrypoint.sh

ENTRYPOINT ["nginx-entrypoint.sh"]
