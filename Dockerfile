FROM hayd/alpine-deno:1.0.0

EXPOSE 8000

WORKDIR /app

USER deno

COPY ./backend ./backend
COPY ./frontend ./frontend

ENV PROFILE=production

RUN deno cache ./backend/mod.ts
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./backend/mod.ts"]
