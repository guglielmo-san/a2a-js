eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NjQxNjY0MTYsImV4cCI6MTkyMTkzMjgzNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJOYW1lIjoiSm9obm55Iiwicm9sZSI6IlJvY2tldCIsImVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.XH3aiaBW2FPcz7CKYpKCFv3B73qy99HGkYBiWiwg-rk



curl -X POST http://localhost:41241/
    -H "X-A2A-Extensions: https://github.com/a2aproject/a2a-js/src/samples/extensions/v1"
    -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NjQxNjY0MTYsImV4cCI6MTkyMTkzMjgzNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJOYW1lIjoiSm9obm55Iiwicm9sZSI6IlJvY2tldCIsImVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.XH3aiaBW2FPcz7CKYpKCFv3B73qy99HGkYBiWiwg-rk"
    -H "Content-Type: application/json"
    -d '{
        "jsonrpc": "2.0",
        "id": 1,
        "method": "message/send",
        "params": {
            "message": {
            "role": "user",
            "parts": [
                {
                "kind": "text",
                "text": "Hello how are you?"
                }
            ],
            "messageId": "9229e770-767c-417b-a0b0-f0741243c589"
            }
        }
    }'