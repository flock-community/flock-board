FROM node:12.14-slim AS FE_BUILD

RUN mkdir -p /app
WORKDIR /app/frontend

COPY ./frontend ./

RUN set -ex; \
  npm i && \
  npm run build

FROM hayd/alpine-deno:1.1.0 AS BASE

RUN mkdir -p /app
WORKDIR /app

USER deno

COPY ./backend ./backend

RUN deno cache ./backend/mod.ts

FROM BASE AS DEV
ENV PROFILE="development"

COPY --from=FE_BUILD /app/frontend ./frontend
#ENTRYPOINT ["sh"]
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./backend/mod.ts"]

FROM BASE AS PROD
ENV PROFILE="production"

COPY --from=FE_BUILD /app/frontend/build ./frontend/build
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./backend/mod.ts"]
