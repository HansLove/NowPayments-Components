# Plan 

Se planea crear una biblioteca de componentes orientados a hacer pagos/retiros en criptomonedas con la
integración del api de nowpayments.

Hay que planear la elección del stack tecnológico con el cual hacer el scaffold del proyecto, serán
componentes React con typescript e integrará storybook para poder visualizar los componentes.

## Componentes a realizar

Son 2:

- Modal para depositos
- Modal para retiros

Estos componentes son personalizables principalmente por la paleta 
de colores porque la intención es re-usarlos en varios proyectos
con una apariencia consistente.

Además, para la lógica que van a ejecutar, hay ciertos parámetros a 
pasarles definidos en cada componente especifico.

### Modal para depositos

Un componente modal que se muestra por encima de la aplicación (usando portales de React);
cuya UX es de un stepper que contiene 3 pasos:

1. Elegir la criptomoneda con la cual pagar
   1. Se obtienen viendo la sección de endpoints relevantes
2. Elegir el monto a depositar
3. Una pantalla de detalles del pago, ha de incluir:
   1. Código QR con la dirección del deposito
   2. La dirección en texto plano + botón de copiar
   3. Detalles como la moneda seleccionada, el monto, id de la transacción
   4. Notas importantes como solamente mandar la moneda seleccionada, que se procesará automáticamente, recomendar mantener el id de la transacción, etc

Todos los detalles que se incluyen en la tercera pantalla vendrán como detalles de las llamadas 
al API de nowpayments.

Se mencionó que puede personalizarse la paleta de colores, pero también ha de incluir props tales como...

- Correo del cliente, pasarle un string directo o un callback (puede ser asíncrono) para obtener el correo
- IPN callback, el URL al que nowpayments enviará notificaciones del pago

### Modal para retiros

Un modal para hacer retiros, convertir saldo de una plataforma en dinero real.

Por el momento solamente se harán conversiones a dos currencies:
- USDT de la red de polygon.
- USDT de la red de tron.

Incluirá un slider como forma de elegir cuando retirar, deberá de aparecer
el porcentaje de saldo que se está retirando.

Además de tener un campo donde ingresar la dirección donde el usuario
quiera recibir el dinero.

Además de la paleta de colores, necesita personalización para:

- IPN callback, el URL al que nowpayments enviará notificaciones del pago.
- Saldo a retirar
- Fórmula para convertir el saldo a USDT, sería un callback asíncrono.

# Endpoints relevantes de nowpayments para la biblioteca

## Traer todas las monedas...

Request:
```shell
curl --location 'https://api.nowpayments.io/v1/merchant/coins' \
--header 'x-api-key: {{api-key}}'
```

Response:
```json
{
  "currencies": [
    "btg",
    "eth",
    "xmr",
    "zec",
    "xvg",
    "ada",
    "lsk",
    "link",
    "rvn",
    "bnbmainnet",
    "zil",
    "bcd",
    "usdt",
    "usdterc20",
    "cro",
    "dai",
    "ht",
    "wabi",
    "busd",
    "algo",
    "usdttrc20",
  ]
}
```

Notas: Estos strings con 'cg_id' (así lo marca la documentación de nowpayments).
Para obtener el logo de las divisas, se puede hacer mediante una consulta a este enlace: https://nowpayments.io/images/coins/{cg_id}.svg
Hay que planear como obtener el resto de información como el nombre, código de la divisa a partir de este cg_id.

## Traer currencies con toda su información...

Request:
```shell
curl --location 'https://api.nowpayments.io/v1/full-currencies' \
--header 'x-api-key: {{api-key}}'
```

Response:
```json
"currencies": [
 {
 "id": 121,
 "code": "AAVE",
 "name": "Aave",
 "enable": true,
 "wallet_regex": "^(0x)[0-9A-Fa-f]{40}$",
 "priority": 127,
 "extra_id_exists": false,
 "extra_id_regex": null,
 "logo_url": "/images/coins/aave.svg",
 "track": true,
 "cg_id": "aave",
 "is_maxlimit": false,
 "network": "eth",
 "smart_contract": null,
 "network_precision": null
 }
]
```
