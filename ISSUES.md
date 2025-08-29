# Issues de API Wasapi

## 🐛 Issue #001: Endpoint de Contactos no Filtra Correctamente

### Descripción del Problema
El endpoint `GET https://api-ws.wasapi.io/api/v1/contacts?page={page}&search={search}&labels={labels}` no está funcionando correctamente al filtrar por el ID de un label En lugar de filtrar y mostrar solo el contacto específico, está retornando todos los contactos del sistema.

### Endpoint Afectado
```
GET https://api-ws.wasapi.io/api/v1/contacts?page={page}&search={search}&labels={labels}
```
JAM: https://jam.dev/c/0c78c273-7860-42cd-859d-5e22a8d72760