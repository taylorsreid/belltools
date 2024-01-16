FROM alpine:latest

ARG PB_VERSION=0.20.7

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY pb_migration[s] /pb/pb_migrations
COPY pb_public[s] /pb/pb_public
COPY pb_hook[s] /pb/pb_hooks

EXPOSE 80

WORKDIR /pb/

RUN ls /pb/

# start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:80"]