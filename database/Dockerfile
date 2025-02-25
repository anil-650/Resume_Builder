FROM postgres:latest

# ENV POSTGRES_DB=mydatabase
# ENV POSTGRES_USER=dev
# ENV POSTGRES_PASSWORD=dev

EXPOSE 5432

COPY initdb.sql /docker-entrypoint-initdb.d/
