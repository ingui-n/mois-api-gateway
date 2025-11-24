# MOIS API Layout

### What does the API Gateway do?

Testuje zda je uživatel přihlášen a zda oplívá správnou rolí pro zobrazení dat z mikroservis. Všechny cesty (endpointy) 
počítají s autorizačním Bearer tokenem, který je zkontrolován a některá data z něho se nastaví do hlaviček (headers) 
požadavků, které dále směřují do jednotlivých mikroservis. 

Co se týká jednotivých přístupových pravidel nad endpointy pro konkrétní uživatele, to je věc jednotlivých mikroservis.

Seznam nastavených hlaviček je následující:

| Header           | Data type                                    |
|------------------|----------------------------------------------|
| X-User-Id        | string uuid                                  |
| X-User-Email     | string email                                 |
| X-User-Firstname | string                                       |
| X-User-Lastname  | string                                       |
| X-User-Roles     | list eg. ["admin", "user", "offline_access"] |

`X-User-Firstname` a `X-User-Lastname` jsou zak=odované za použití `encodeURIComponent()` kvůli znakům jako š, č, ř, 
atd. Před použitím je nutné je dekódovat. Například za použití `decodeURIComponent()`.

---

## Fakulty

* Props: name, shortcut, reservationTimeStart, reservationTimeEnd, maxUserReservationCount, maxUserReservationTime,
  maxUserReservationTimeWeekly, createdAt

### GET all

* /faculty

Response:

```json
{
  "content": [
    {
      "id": "uuid",
      "name": "string",
      "shortcut": "string",
      "reservationTimeStart": "time", // čas první možné rezervace pro každý den
      "reservationTimeEnd": "time", // čas do kdy je možné rezervovat
      "maxUserReservationCount": "number", // maximální počet rezervací celkem
      "maxUserReservationTime": "number", // pro jednu konkrétní rezervaci (minuty)
      "maxUserReservationTimeWeekly": "number", // za týden pro uživatele (minuty)
      "createdAt": "dateTime"
    }
  ],
  "page": {
    "size": "number",
    "number": "number",
    "totalElements": "number",
    "totalPages": "number"
  }
}
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
  "reservationTimeStart": "time",
  "reservationTimeEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeekly": "number",
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
  "shortcut": "string",
  "reservationTimeStart": "time",
  "reservationTimeEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeekly": "number"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "shortcut": "string",
  "reservationTimeStart": "time",
  "reservationTimeEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeekly": "number",
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
  "reservationTimeStart": "time",
  "reservationTimeEnd": "time",
  "maxUserReservationCount": "number",
  "maxUserReservationTime": "number",
  "maxUserReservationTimeWeekly": "number",
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

* /computerRoom?facultyId="uuid"

Response:

```json
{
  "content": [
    {
      "id": "uuid",
      "facultyId": "uuid",
      "name": "string",
      "createdAt": "dateTime"
    }
  ],
  "page": {
    "size": "number",
    "number": "number",
    "totalElements": "number",
    "totalPages": "number"
  }
}
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

* /computer?computerRoomId="uuid"

Response:

```json
{
  "content": [
    {
      "id": "uuid",
      "name": "string",
      "available": "boolean",
      "computerRoomId": "uuid",
      "configId": "uuid",
      "createdAt": "dateTime"
    }
  ],
  "page": {
    "size": "number",
    "number": "number",
    "totalElements": "number",
    "totalPages": "number"
  }
}
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

### GET one unwrapped

* /computer/{id}?unwrap=true

Response:

```json
{
  "id": "uuid",
  "name": "string",
  "available": "boolean",
  "computerRoom": {
    "id": "uuid",
    "facultyId": "uuid",
    "name": "string",
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
{
  "content": [
    {
      "id": "uuid",
      "name": "string",
      "cpu": "string",
      "ram": "string",
      "gpu": "string",
      "createdAt": "dateTime"
    }
  ],
  "page": {
    "size": "number",
    "number": "number",
    "totalElements": "number",
    "totalPages": "number"
  }
}
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

* /reservations?computerId="uuid"&from="dateTime"&to="dateTime"

#### GET all by dates

* /reservations?from="dateTime"&to="dateTime"

#### GET all by userId

Returns only current or future reservations

* /reservations?userId="uuid"

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
        "facultyId": "uuid",
        "name": "string",
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

### GET one by id

* /reservation/{id}

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
      "facultyId": "uuid",
      "name": "string",
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
  "startDateTime": "dateTime",
  "endDateTime": "dateTime"
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
      "facultyId": "uuid",
      "name": "string",
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
