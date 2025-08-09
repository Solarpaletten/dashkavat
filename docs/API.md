# SmartVat API Documentation

Base URL: `http://localhost:4000`

## Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "service": "VAT Backend - ACCURATE VERSION",
  "port": 4000,
  "timestamp": "2025-08-09T19:39:56.555Z"
}
```

### Calculate VAT
```
POST /api/vat/calculate
```

**Request Body:**
```json
{
  "field40a": 18400,
  "field40b": 0,
  "field41": 18400,
  "field43": 0,
  "field81a": 133.56,
  "field81b": 0,
  "field89a": 15755,
  "field89b": 484.96,
  "field67": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "field4": 18400,
    "field8": 16373.52,
    "field61": 3085.59,
    "field66": 0,
    "field62": 3085.59,
    "field83": -3085.59,
    "plannedProfit": 2026.48,
    "status": "ERSTATTUNG",
    "calculatedAt": "2025-08-09T19:39:56.555Z"
  }
}
```

### Test Data
```
GET /api/vat/test
```

Returns calculation with ASSET LOGISTICS test data.
