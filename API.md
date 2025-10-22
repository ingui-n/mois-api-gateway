# MOIS API Layout

## Fakulty

* Props: name, shortcut, createdAt

### GET all

* /faculty

Response:

```json
[
  {
    "id": "uuid",
    "name": "string",
    "shortcut": "string",
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET one

* /faculty/{id}

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "shortcut": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* /faculty

Request:

```json
{
  "name": "string",
  "shortcut": "string"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "shortcut": "string",
  "createdAt": "dateTime"
}
```

HTTP 201

### PUT edit one

* /faculty/{id}

Request:

```json
{
  "name": "string",
  "shortcut": "string"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "shortcut": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### DELETE one

Delete proběhne pouze pokud neexistuje ani jedna `computerRoom`, která by měla FK `facultyId`.

* /faculty/{id}

Response:

HTTP 200

---

## Místnosti

* Props: name, facultyId, createdAt

### GET all

* /computerRoom


Response:

```json
[
  {
    "id": "uuid",
    "facultyId": "uuid",
    "name": "string",
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET all by faculty

* /computerRoom

Request: 
```json
{
    "facultyId": "uuid"
}
```

Response:

```json
[
  {
    "id": "uuid",
    "facultyId": "uuid",
    "name": "string",
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET one

* /computerRoom/{id}

Response:

```json
{
  "id": "uuid",
  "facultyId": "uuid",
  "name": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* /computerRoom

Request:

```json
{
  "name": "string",
  "facultyId": "uuid"
}
```

Response:

```json
{
  "id": "uuid",
  "facultyId": "uuid",
  "name": "string",
  "createdAt": "dateTime"
}
```

HTTP 201

### PUT edit one

* /computerRoom/{id}

Request:

```json
{
  "name": "string"
}
```

Response:

```json
{
  "id": "uuid",
  "facultyId": "uuid",
  "name": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### DELETE one

Delete proběhne pouze pokud neexistuje žádný `computer`, který by měl FK `computerRoomId`.

* /computerRoom/{id}

Response:

HTTP 200

---

## PC

* Props: name, available, roomId, config: {name, CPU, RAM, GPU}, createdAt

### GET all

* /computer

Response:

```json
[
  {
    "id": "uuid",
    "name": "string",
    "available": "boolean",
    "computerRoomId": "uuid",
    "configId": "uuid",
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET all by room

* /computer

Request:
```json
{
  "computerRoomId": "uuid"
}
```

Response:

```json
[
  {
    "id": "uuid",
    "name": "string",
    "available": "boolean",
    "roomId": "uuid",
    "configId": "uuid",
    "createdAt": "dateTime"
  }
]
```

### GET one

* /computer/{id}

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "available": "boolean",
  "computerRoomId": "uuid",
  "configId": "uuid",
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* /computer

Request:

```json
{
  "name": "string",
  "available": "boolean",
  "computerRoomId": "uuid",
  "configId": "uuid"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "available": "boolean",
  "computerRoomId": "uuid",
  "configId": "uuid",
  "createdAt": "dateTime"
}
```

HTTP 201

### PUT edit one

* /computer/{id}

Request example:

```json
{
  "name": "string",
  "available": "boolean",
  "computerRoomId": "uuid",
  "configId": "uuid"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "available": "boolean",
  "computerRoomId": "uuid",
  "configId": "uuid",
  "createdAt": "dateTime"
}
```

HTTP 200

### DELETE one

* /computer/{id}

Response:

HTTP 200

---

## PC configuration

* Props: name, cpu, ram, gpu, createdAt

### GET all

* /computerConfig

Response:

```json
[
  {
    "id": "uuid",
    "name": "string",
    "cpu": "string",
    "ram": "string",
    "gpu": "string",
    "os": "string",
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET one

* /computerConfig/{id}

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "cpu": "string",
  "ram": "string",
  "gpu": "string",
  "os": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* /computerConfig

Request:

```json
{
  "name": "string",
  "cpu": "string",
  "ram": "string",
  "gpu": "string",
  "os": "string"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "cpu": "string",
  "ram": "string",
  "gpu": "string",
  "os": "string",
  "createdAt": "dateTime"
}
```

HTTP 201

### PUT edit one

* /computerConfig/{id}

Request example:

```json
{
  "name": "string",
  "cpu": "string",
  "ram": "string",
  "gpu": "string",
  "os": "string"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "cpu": "string",
  "ram": "string",
  "gpu": "string",
  "os": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### DELETE one

* /computerConfig/{id}

Response:

HTTP 200

---

## Rezervace

* Props: userId, computerId, startTime, endTime, createdAt

### GET all

* /reservations

#### GET all by computerRoomId

Request:

```json
{
  "computerRoomId": "uuid"
}
```

#### GET all by computerId

Request:

```json
{
  "computerId": "uuid"
}
```

#### GET all by userId

Request:

```json
{
  "userId": "uuid"
}
```

Response:

```json
[
  {
    "id": "uuid",
    "computerId": "uuid",
    "userId": "uuid",
    "startTime": "dateTime",
    "endTime": "dateTime",
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET one

* /reservation

#### GET one by id

Request:

```json
{
  "userId": "uuid"
}
```

#### GET one by userId

Request:

```json
{
  "userId": "uuid"
}
```

#### GET one by computerId

Request:

```json
{
  "computerId": "uuid"
}
```

Response:

```json
{
  "id": "uuid",
  "computerId": "uuid",
  "userId": "uuid",
  "startTime": "dateTime",
  "endTime": "dateTime",
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* id, čas - kontrola zda je PC možné zarezervovat a zda není např v opravě


* /reservation

Request:

```json
{
  "computerId": "uuid",
  "userId": "uuid",
  "startTime": "dateTime",
  "endTime": "dateTime"
}
```

Response:

```json
{
  "id": "uuid",
  "computerId": "uuid",
  "userId": "uuid",
  "startTime": "dateTime",
  "endTime": "dateTime",
  "createdAt": "dateTime"
}
```

HTTP 201

### DELETE one

* /reservation/{id}

Response:

HTTP 200
