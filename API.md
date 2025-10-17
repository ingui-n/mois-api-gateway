# MOIS

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

* /faculty/{uuid}

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

* /faculty/{uuid}

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
  "name": "string",
  "shortcut": "string",
  "createdAt": "dateTime"
}
```

HTTP 200

### DELETE one

Delete proběhne pouze pokud neexistuje ani jedna `computerRoom`, která by měla FK `facultyId`.

* /faculty/{uuid}

Response:

HTTP 200

---

## Místnosti

* Props: name, facultyId, createdAt

### GET all by faculty

* /room

Request:

```json
{
  "facultyId": uuid
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

* /room/{id}

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

* /room
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

* /room/{id}

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

* /room/{id}

Response:

HTTP 200

---

## PC
* Props: status, computerRoomId, config: {CPU, RAM, GPU}, createdAt

### GET all by faculty and room

* /computer

Request:

```json
{
  "roomId": long
}
```

Response:

```json
[
  {
    "id": "uuid",
    "status": {
      "id": "id",
      "name": "string"
    }, - ? Unless we want the status to be editable by user, I guess ENUM would be enough
    "computerRoomId": "uuid",
    "config": {
      "CPU": "string",
      "RAM": "string",
      "GPU": "string"
    },
    "createdAt": "dateTime"
  }
]
```

HTTP 200

### GET one

* /computer/{id}

Response:

```json
{
  "id": "uuid",
  "status": {
    "id": "id",
    "name": "string"
  },
  "computerRoomId": "uuid",
  "config": {
    "CPU": "string",
    "RAM": "string",
    "GPU": "string"
  },
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* /computer

Request:

```json
{
  "status": {
    "id": "id",
    "name": "string"
  },
  "computerRoomId": "uuid",
  "config": {
    "CPU": "string",
    "RAM": "string",
    "GPU": "string"
  }
}
```

Response:

```json
{
  "id": "uuid",
  "status": {
    "id": "id",
    "name": "string"
  },
  "computerRoomId": "uuid",
  "config": {
    "CPU": "string",
    "RAM": "string",
    "GPU": "string"
  },
  "createdAt": "dateTime"
}
```

HTTP 201

### PUT edit one

* /computer/{id}

Request example:

```json
{
  "status": {
    "id": "id",
    "name": "string"
  },
  "config": {
    "RAM": "string"
  }
}
```

Response:

```json
{
  "id": "uuid",
  "status": {
    "id": "id",
    "name": "string"
  },
  "computerRoomId": "uuid",
  "config": {
    "CPU": "string",
    "RAM": "string",
    "GPU": "string"
  },
  "createdAt": "dateTime"
}
```

HTTP 200

### DELETE one

* /computer/{id}

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

* /reservation/{id}

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

* /reservation/{uuid}

Response:

HTTP 200
