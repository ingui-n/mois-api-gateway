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

### GET all

* /faculty/{facultyUuid}/computerRoom

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

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}

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

* /faculty/{facultyUuid}/computerRoom

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

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}

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

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}

Response:

HTTP 200

---

## PC

* Props: status, computerRoomId, config: {CPU, RAM, GPU}, createdAt

### GET all

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}/computer

Response:

```json
[
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
]
```

HTTP 200

### GET one

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}/computer/{computerUuid}

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

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}/computer

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

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}/computer/{computerUuid}

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

* /faculty/{facultyUuid}/computerRoom/{computerRoomUuid}/computer/{computerUuid}

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
