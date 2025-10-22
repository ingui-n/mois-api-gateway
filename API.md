# MOIS API Layout

## Fakulty

* Props: name, shortcut, reservationDateStart, reservationDateEnd, maxUserReservationCount, maxUserReservationTime,
  maxUserReservationTimeWeakly, createdAt

### GET all

* /faculty

Response:

```json
[
  {
    "id": "uuid",
    "name": "string",
    "shortcut": "string",
    "reservationDateStart": "time", // čas první možné rezervace pro každý den
    "reservationDateEnd": "time", // čas do kdy je možné rezervovat
    "maxUserReservationCount": "number", // maximální počet rezervací celkem
    "maxUserReservationTime": "number", // pro jednu konkrétní rezervaci
    "maxUserReservationTimeWeakly": "number", // za týden pro uživatele
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
  "reservationDateStart": "time",
  "reservationDateEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeakly": "number",
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
  "reservationDateStart": "time",
  "reservationDateEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeakly": "number",
  "createdAt": "dateTime"
}
```

HTTP 201

### PUT edit one

* /faculty/{id}

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
  "reservationDateStart": "time",
  "reservationDateEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeakly": "number",
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

* Props: name, available, computerRoomId, configId, createdAt

### GET all by computerRoomId

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
    "computerRoomId": "uuid",
    "configId": "uuid",
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
  "gpu": "string"
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
  "gpu": "string"
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

* Props: {computer: {computerRoom, computerConfig}}  userId, computerId, startTime, endTime, password, deletedAt, createdAt

### GET all

* /reservations

#### GET all by computerId

Request:

```json
{
  "computerId": "uuid",
  "from": "datetime",
  "to": "datetime"
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
    "computer": {
      "id": "uuid",
      "name": "string",
      "available": "boolean",
      "computerRoom": {
        "id": "uuid",
        "name": "string",
        "available": "boolean",
        "computerRoomId": "uuid",
        "configId": "uuid",
        "createdAt": "dateTime"
      },
      "computerConfig": {
        "id": "uuid",
        "name": "string",
        "cpu": "string",
        "ram": "string",
        "gpu": "string",
        "createdAt": "dateTime"
      },
      "createdAt": "dateTime"
    },
    "userId": "uuid",
    "startTime": "dateTime",
    "endTime": "dateTime",
    "password": "string",
    "deletedAt": "dateTime|null",
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
  "id": "uuid"
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
  "computer": {
    "id": "uuid",
    "name": "string",
    "available": "boolean",
    "computerRoom": {
      "id": "uuid",
      "name": "string",
      "available": "boolean",
      "computerRoomId": "uuid",
      "configId": "uuid",
      "createdAt": "dateTime"
    },
    "computerConfig": {
      "id": "uuid",
      "name": "string",
      "cpu": "string",
      "ram": "string",
      "gpu": "string",
      "createdAt": "dateTime"
    },
    "createdAt": "dateTime"
  },
  "userId": "uuid",
  "startTime": "dateTime",
  "endTime": "dateTime",
  "password": "string",
  "deletedAt": "dateTime|null",
  "createdAt": "dateTime"
}
```

HTTP 200

### POST create one

* id, čas - kontrola zda je PC možné zarezervovat a zda není např v opravě

Před rezervací se spočítá čas rezervace pro daný týden, pokud přesáhne X hodin, zamítnout.

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
  "computer": {
    "id": "uuid",
    "name": "string",
    "available": "boolean",
    "computerRoom": {
      "id": "uuid",
      "name": "string",
      "available": "boolean",
      "computerRoomId": "uuid",
      "configId": "uuid",
      "createdAt": "dateTime"
    },
    "computerConfig": {
      "id": "uuid",
      "name": "string",
      "cpu": "string",
      "ram": "string",
      "gpu": "string",
      "createdAt": "dateTime"
    },
    "createdAt": "dateTime"
  },
  "userId": "uuid",
  "startTime": "dateTime",
  "endTime": "dateTime",
  "password": "string",
  "deletedAt": "dateTime|null",
  "createdAt": "dateTime"
}
```

HTTP 201

### DELETE one

* /reservation/{id}

Nemaže náznam ale nastavuje deletedAt na dateTime

Response:

HTTP 200
