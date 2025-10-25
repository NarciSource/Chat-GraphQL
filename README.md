# GraphQL 채팅 서비스 백엔드

## 🛠️ 기술 스택

[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)](https://graphql.org/)  
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/) [![Apollo](https://img.shields.io/badge/Apollo-311C87?style=flat-square&logo=apollographql&logoColor=white)](https://www.apollographql.com/) [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/ko) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io) [![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/ko/dynamodb/) [![Elasticsearch](https://img.shields.io/badge/ElasticSearch-005571?style=flat-square&logo=elasticsearch&logoColor=white)](https://www.elastic.co/kr/elasticsearch)  
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io/) [![Voyager](https://img.shields.io/badge/🛰️_Voyager-548f9e?style=flat-square&logoColor=white)](https://github.com/APIs-guru/graphql-voyager)  
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2AB4FF.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjMgNjY1Ij4KICA8cGF0aCBmaWxsPSIjZmNmY2ZjIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MTggMWMtNiAxLTkgMy0xMyA4LTQgMy00IDMtMTAgMS0xMi02LTYwIDAtNjYgOC01IDYtMTEgNDQtOCA1MGwyMyAxN2M3IDQgNyA2IDIgNy0yMyAzLTM3IDI5LTI5IDUyIDMgOSAzIDktMTAgNi0xOS01LTI0LTYtNDUtNS00NyAwLTg2IDE4LTEwOSA1MGExMzUgMTM1IDAgMCAwLTI0IDY0Yy0zIDI4IDIgNDggMTcgNzJsMjIgMjdjNDAgNDQgNDEgNjYgMyA5MS00NSAzMC0xMDQgMTktMTA2LTIwLTEtMTYgNC0yOSAxNy01MiAxMy0yNCAxNC0zMyAzLTUybDEzLThjMjQtMTIgMjItOSAyMy0zNCAwLTIyIDItMjAtMjMtMzAtMTgtNi0yMC02LTQwLTEtMjggOS00MCAxNC00MSAxOCAwIDItMSAzLTIgMy03IDAtMTQgMTItMTUgMjUtMSAyMSA2IDI5IDMwIDM2IDMwIDkgMzUgMjQgMTkgNDktMzYgNTMtMzIgMTAyIDExIDEyMSAzNSAxNiA3NCAxMyAxMTktOWwxMS01IDMgMzJjMCAzNC00MCAzOC04OSA4bC0xNi0xMGMtNTEtMjktMTAyIDI0LTY2IDcwIDE1IDIwIDQyIDIxIDQ2IDIgMi04IDAtMTEtMTAtMTktMTYtMTItMTctMjQtMi0yNyA1LTEgMjYgOCAyOCAxMmwzNCAyOSAyMCAxMiAyMCA4YzM2IDEzIDgyLTE1IDgyLTUwIDAtMTAgMC0xMCA2LTUgMTAgMTAgMTggMTYgMjMgMTkgNiAzIDYgNCAxIDctNSAyLTUgMi01IDctMSA4IDEgMjkgNCAzMyA0IDcgNjMgNDYgNjkgNDYgMyAwIDQ4LTI1IDUxLTI5IDItMSAzLTM0IDEtMzZsLTE2LTljLTE2LTgtMTYtOC05LTEwIDE5LTcgMzctMjcgNDMtNDdsNS0xYTE2NSAxNjUgMCAwIDAgNjAtMTNjOSAwIDM0LTIyIDQwLTM0bDQtOGM0LTcgNi0yNiA2LTU2IDAtMjkgMS0yNy0xMC0yOS02LTItOC0zLTEzLTgtMzAtMjktNzktMjMtOTYgMTAtMyA3LTMgNy04IDlzLTYgNS01IDE3djE1YzEgMTQgNCAxNiAzNCAyOGwxMiA2YzcgMyA3IDMgMzAtNyA4LTMgOS0zIDkgMS02IDIyLTY0IDQyLTczIDI0YTg3IDg3IDAgMCAwLTYzLTQyYy04IDAtOCAwIDYtMTFhNzM2IDczNiAwIDAgMCA4NS04OWwzLTVjMTktMzEgMjEtNzMgMy0xMDctNy0xNS0yMy0zNS0zNi00OC0zOS0zNi00Ni00Ny0zOC02MiA0LTggMTUtMTcgMjAtMTVhNDUyIDQ1MiAwIDAgMCA1NS0xMmMxMS00IDEzLTUgMTQtMTAgMC00IDItNyA5LTE0IDI0LTI2LTgtODAtNDMtNzFNMjI4IDMzNGMxIDEgMCAxLTEgMS0yMCAwLTI4IDMyLTEyIDQyIDE3IDkgMzctMyAzNy0yMiAwLTctNy0xNy0xMS0xN3YtMWMzLTIgMC0zLTctNGwtNiAxbTU0IDgtNCAxYy0yMiAzLTI1IDM5LTMgNDQgMjQgNSA0MS0yMSAyNS0zOGwtNS0zdi0zYy0xLTItMTQtMy0xMy0xbS00OSAxMjBjLTYgNy05IDE0LTkgMjQgMCA4IDEgMTIgMyA2IDItMTIgOC0yOCAxMy0zM3YtM2MtMSAwLTQgMi03IDZtOTcgNGMwIDIgMjMgMTcgMjcgMTcgMiAwIDEtMy00LTctOS03LTIzLTEzLTIzLTEwbS01NCA2Yy0yMSA1MSAyOSA5NiA3MyA2NyA4LTYgOC03LTEtOC0zOS0zLTYzLTIzLTY2LTU0LTItMTItMy0xMy02LTUiLz4KPC9zdmc+Cg==&style=flat-square&logoColor=black)](https://docs.docker.com/compose/) [![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white)](https://www.docker.com/)

## 💡 주요 기능

| 기능 | 설명 | 쿼리(Query) / 요청(Mutation) | 구독(Subscription) |
| --- | --- | --- | --- |
| 사용자 등록 | 유저ID &harr; 소켓ID 매핑 | mutation setUser<br>(id: String!): Boolean! | subscription userPresence: [String!]! |
| 방 생성 | 방 객체 생성 &rarr;<br> 참가자 초대 이벤트 발생 | mutation createRoom<br>(hostId: String!, participants: [String!]!): String! | subscription roomCreated<br>(userId: String!): Room! |
| 방 참가 | 방에 사용자 추가 &rarr;<br> 참가자 초대 이벤트 발생 | mutation joinRoom<br>(roomId: String!, userId: String!): Boolean! | subscription roomCreated<br>(userId: String!): Room! |
| 방 떠나기 | 방에서 사용자 제거 &rarr;<br> 떠남 알림 | mutation leaveRoom<br>(roomId: String!, userId: String!): Boolean! | subscription system<br>(input: SystemInput!): Message! |
| 메시지 교환 | 방에서 메시지 중계 | mutation message<br>(content: String!, roomId: String!, userId: String!):<br> Boolean! | subscription message<br>(roomId: String!): Message! |
| 타이핑 알림 | 방에서 타이핑 이벤트 중계 | mutation typing<br>(roomId: String!, userId: String!): Boolean! | subscription typing<br>(roomId: String!): Message! |
| 메시지 기록 <br>불러오기 | 방 참가 전 메시지 기록 불러오기 | query history(roomId: String!): [Message!]! |  |
| 메시지 검색 | 키워드로 메시지 기록 불러오기 | query search<br>(keyword: String!, userId: String!): [Message!]! |  |

## 🛰️ GraphQL Schema Diagram

> GraphQL Voyager는 GraphQL 스키마를 시각적으로 탐색하고 구조를 이해할 수 있도록 돕는 정적/인터랙티브 시각화 도구  
> 타입과 타입 간 참조를 그래프 형태로 표현

| [![voyager](https://github.com/user-attachments/assets/91d13616-99d2-416c-aef8-9462a21ae382)](https://narcisource.github.io/Chat-Service--Backend/) |
| --- |
| [GraphQL Voyager 바로가기](https://narcisource.github.io/Chat-Service--Backend/) |

```mermaid
classDiagram
  direction LR

  class Message {
    +content : String
    +roomId : String!
    +userId : String!
  }

  class Room {
    +participants : [String!]!
    +roomId : String!
  }

  class SystemInput {
    +roomId : String
    +userId : String
  }

  class Query {
    +users() : [String!]!
    +history(roomId: String!) : [Message!]!
    +search(keyword: String!, userId: String!) : [Message!]!
  }

  class Mutation {
    +createRoom(hostId: String!, participants: [String!]!) : String!
    +joinRoom(roomId: String!, userId: String!) : Boolean!
    +leaveRoom(roomId: String!, userId: String!) : Boolean!
    +message(content: String!, roomId: String!, userId: String!) : Boolean!
    +setUser(id: String!) : Boolean!
    +typing(roomId: String!, userId: String!) : Boolean!
  }

  class Subscription {
    +message(roomId: String!) : Message!
    +roomCreated(userId: String!) : Room!
    +system(input: SystemInput!) : Message!
    +typing(roomId: String!) : Message!
    +userPresence : [String!]!
  }

  %% 관계
  Mutation --> Room : create/join/leave
  Mutation --> Message : send
  Subscription --> Message : publishes
  Subscription --> Room : publishes
  Subscription --> SystemInput : uses
  Message --> Room : belongs to
  Query --> Message : get
```

## 📐 Sequence Diagram

```mermaid
sequenceDiagram
  participant Web1
  participant Web2
  participant APIGateway@{ "type" : "queue" }
  participant Servers@{ "type" : "collections" }
  participant RedisStore@{ "type": "database" }
  participant RedisPubSub@{ "type" : "queue" }
  participant RedisStreams@{ "type" : "queue" }
  participant DynamoDB@{ "type" : "database" }
  participant Elasticsearch@{ "type" : "database"}

  activate Servers

  %% muation %%
  rect rgba(155, 198, 142, 0.7)
    Web1 ->> APIGateway: mutation setUser(id)
    APIGateway ->> Servers: forward
    Servers ->> RedisStore: store
  end

  %% 구독 %%
  rect rgb(191, 223, 255, 0.7)
    Web1 ->> APIGateway: subscription roomCreated(userId)
    APIGateway ->> Servers:
    Servers ->> RedisPubSub: subscribe
  end

  par For each room
    rect rgba(155, 198, 142, 0.7)
      Web1 ->> APIGateway: mutation createRoom(hostId, participants)
      APIGateway ->> Servers:
      Servers ->> RedisStore: [roomId, members]
      Servers ->> RedisPubSub: publish roomCreated(room)
      RedisPubSub ->> RedisPubSub: publish
    end

    opt Room created
      rect rgba(155, 198, 142, 0.7)
        Web2 ->> APIGateway: mutation joinRoom(roomId, userId)
        APIGateway ->> Servers:
        Servers ->> RedisPubSub: publish roomCreated(room)
      end

      rect rgb(233, 191, 201, 0.7)
        Web2 ->> APIGateway: query history(roomId)
        APIGateway ->> Servers:
        Servers ->> DynamoDB: getMessageHistory()
        DynamoDB -->> Servers: MessageHistory
        Servers -->> APIGateway:
        APIGateway -->> Web2: [messages]
      end

      rect rgb(191, 223, 255, 0.7)
        Web1 ->> APIGateway: subscription message(roomId)
        Web2 ->> APIGateway:
        APIGateway ->> Servers:
        Servers ->> RedisStreams: subscribe

        Web1 ->> APIGateway: subscription typing(roomId)
        Web1 ->> APIGateway: subscription system(input)
        APIGateway ->> Servers:
        Servers ->> RedisPubSub: subscribe
      end

      rect rgba(155, 198, 142, 0.7)
        loop Multiple events
          Web1 ->> APIGateway: mutation message(roomId, userId, content)
          APIGateway ->> Servers:
          Servers ->> RedisStreams: publish message(message)
          RedisStreams ->> RedisStreams: publish

          rect rgba(255,235,200,0.7)
            loop Sync Consumer
              RedisStreams ->> DynamoDB: store
              RedisStreams ->> Elasticsearch: indexing
            end
          end

          Web1 ->> APIGateway: mutation typing(roomId, userId)
          APIGateway ->> Servers:
          Servers ->> RedisPubSub: publish typing(ping)
          RedisPubSub ->> RedisPubSub: publish
        end
      end
    end

  and Search
    rect rgb(233, 191, 201, 0.7)
      Web1 ->> APIGateway: query search(userId, keyword)
      APIGateway ->> Servers:
      Servers ->> Elasticsearch: searchByKeyword()
      Elasticsearch -->> Servers: search result
      Servers -->> APIGateway:
      APIGateway -->> Web1: [messages]
    end

  and Sync GraphQL Subscriptions
    rect rgba(255,235,200,0.7)
      RedisStreams -->> Servers: asyncIterator
      RedisPubSub -->> Servers: asyncIterator
      Servers -->> APIGateway: push
      APIGateway -->> Web1: [roomCreated| message | typing | system]
      APIGateway -->> Web2:
    end
  end
  deactivate Servers
```

## 📂 폴더 구조

<details>
<summary>열기</summary>

```
server
├─ .env
├─ docs
│  └─ index.html
├─ graphql
│  └─ schema.gql
├─ src
│  ├─ main.ts
│  ├─ common
│  │  ├─ graphql
│  │  │  ├─ index.ts
│  │  │  └─ module.ts
│  │  ├─ redis
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  └─ providers
│  │  │     ├─ index.ts
│  │  │     ├─ storage.ts
│  │  │     ├─ pubsub.ts
│  │  │     └─ streams.ts
│  │  ├─ dynamo
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  └─ provider.ts
│  │  ├─ es
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  └─ provider.ts
│  │  └─ symbols.ts
│  ├─ model
│  │  ├─ Message.ts
│  │  ├─ Room.ts
│  │  └─ schemaDefinition.ts
│  ├─ core
│  │  ├─ controller.ts
│  │  └─ module.ts
│  ├─ domain
│  │  ├─ shared
│  │  │  └─ events
│  │  │     ├─ index.ts
│  │  │     ├─ PubSubPublish.event.ts
│  │  │     ├─ PubSubPublish.handler.ts
│  │  │     ├─ StreamsPublish.event.ts
│  │  │     └─ StreamsPublish.handler.ts
│  │  ├─ user
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  ├─ model.ts
│  │  │  ├─ queries
│  │  │  │  ├─ index.ts
│  │  │  │  └─ GetUsers.query.ts
│  │  │  │     └─ GetUsers.handler.ts
│  │  │  ├─ commands
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ DisconnectUser.command.ts
│  │  │  │  │  └─ DisconnectUser.handler.ts
│  │  │  │  └─ RegisterUser.command.ts
│  │  │  │     └─ RegisterUser.handler.ts
│  │  │  └─ resolvers
│  │  │     ├─ index.ts
│  │  │     ├─ query.ts
│  │  │     ├─ mutation.ts
│  │  │     └─ subscription.ts
│  │  ├─ chat
│  │  │  ├─ index.ts
│  │  │  ├─ model.ts
│  │  │  ├─ module.ts
│  │  │  ├─ queries
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ GetMessageHistory.query.ts
│  │  │  │  │  └─ GetMessageHistory.handler.ts
│  │  │  │  ├─ GetPartitions.query.ts
│  │  │  │  │  └─ GetPartitions.handler.ts
│  │  │  │  └─ SearchMessages.query.ts
│  │  │  │     └─ SearchMessages.handler.ts
│  │  │  └─ resolvers
│  │  │     ├─ index.ts
│  │  │     ├─ query.ts
│  │  │     ├─ mutation.ts
│  │  │     └─ subscription.ts
│  │  └─ room
│  │     ├─ index.ts
│  │     ├─ model.ts
│  │     ├─ module.ts
│  │     ├─ quires
│  │     │  ├─ index.ts
│  │     │  └─ GetRoomsByUser.query.ts
│  │     │     └─ GetRoomsByUser.handler.ts
│  │     ├─ commands
│  │     │  ├─ index.ts
│  │     │  ├─ CreateRoom.command.ts
│  │     │  │  └─ CreateRoom.handler.ts
│  │     │  ├─ JoinRoom.command.ts
│  │     │  │  └─ JoinRoom.handler.ts
│  │     │  └─ LeaveRoom.command.ts
│  │     │     └─ LeaveRoom.handler.ts
│  │     └─ resolvers
│  │        ├─ index.ts
│  │        ├─ mutation.ts
│  │        └─ subscription.ts
│  └─ repository
│     ├─ index.ts
│     ├─ module.ts
│     └─ interface.ts
│        ├─ InMemoryRepository.ts
│        └─ DatabaseRepository.ts
├─ Dockerfile
│  └─ .dockerignore
├─ nest-cli.json
├─ codegen.introspection.yml # graphQL 스키마 생성 정의
├─ package.json
│  └─ package-lock.json
├─ tsconfig.json
│  └─ tsconfig.build.json
└─ eslint.config.mjs
   └─ .prettierrc
```

</details>

## 🚀 실행 방법

```sh
$ docker run -d \
  --name redis-container \
  --env-file ./.env \
  -p ${REDIS_PORT}:6379 \
  redis:8.2.1

$ docker run -d \
  --name dynamodb-container \
  --env-file ./.env \
  -p ${DYNAMO_PORT}:8000 \
  amazon/dynamodb-local:3.1.0

$ docker run -d \
  --name es-container \
  --env-file .env \
  -p ${ES_PORT}:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:9.2.0

$ docker build \
  -f Dockerfile \
  -t chat/server:latest \
  .

$ docker run -d \
  --name chat/server \
  --env-file .env \
  -p 3000:3000
  chat/server:latest
```

## 🖥️ 접속 안내

| 환경               | URL                              |
| ------------------ | -------------------------------- |
| server healthcheck | <http://localhost:3000>          |
| graphql schema     | <http://localhost:3000/voyager>⁠ |
| graphql playground | <http://localhost:3000/graphql>⁠ |
