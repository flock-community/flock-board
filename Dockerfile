FROM hayd/alpine-deno:1.1.0

EXPOSE 8000

WORKDIR /app

USER deno

COPY ./backend ./backend
COPY ./frontend ./frontend
COPY ./database ./database

ENV PROFILE=production

RUN deno cache --unstable ./backend/mod.ts
CMD ["run",  "--unstable",  "--allow-all", "./backend/mod.ts"]
