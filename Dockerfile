FROM hayd/alpine-deno:1.0.0

EXPOSE 8000

WORKDIR /app

USER deno

COPY ./backend ./backend
COPY ./frontend ./frontend

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./backend/mod.ts"]
