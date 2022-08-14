# Akinon Interview Project - Currency API

Verilen döviz bilgilerinin görüntülenebilmesi, istenilen dövize göre çeviri yapılabilmesi, yapılan çevirilerin kayıtlarının db de tutulabilmesiyle alakalı işlemleri yapabilen bir projedir.

## Servisler

### Get latest 

**Verilen döviz bilgisinin diğer dövizlerde karşılığının görüntülenebilmesi**

Örnek Request:
* /get-latest?sourceCurrency=TRY&targetCurrencies=EUR,USD

Örnek Response
```json
{"status":true,
"package":{"success":true,"timestamp":1660468863,"base":"TRY","date":"2022-08-14",
"rates":{"EUR":0.054321,"USD":0.055753}}}
```

### Convert

**Verilen dövizlerin miktarları arasında çevirinin yapılması**

Örnek Request:
* /convert?from=TRY&to=USD&amount=5

Örnek Response
```json
{"status":true,
"package":{"success":true,"query":{"from":"TRY","to":"USD","amount":5},"info":{"timestamp":1660469103,"rate":0.055753},"date":"2022-08-14","result":0.278765}}
```

### Get Transactions

**Daha önce çevirilmiş olan dövizlerin logların görüntülenebileceği servis**

Örnek Request:
* /get-transactions?createdAtStart=2021-08-11&createdAtEnd=2022-08-16

Örnek Response
```json
{"status":true,
"package":[{"query":{"from":"TRY","to":"USD","amount":5},"_id":"62f8d2f0a44b6fcb0515d5bd","result":0.278765,"createdAt":"2022-08-14T10:48:16.216Z"}]}
```
