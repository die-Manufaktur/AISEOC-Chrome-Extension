---
created: 2026-03-13 15:25
tags:
- technology
type: technology
updated: 2026-03-13 15:25
---

# PostgreSQL

## Facts

- Main database
- Version 15

## Relations

- ← **uses** [[Project Alpha]]: Main database

## Knowledge

**[solution] Connection pool exhaustion fix** (2026-03-13)
OOM with 200+ WebSocket connections. Each WS held a separate connection. Solution: Redis cache for [[User]]Service and BlockedAccountService.

```yaml
spring.datasource.hikari.maximum-pool-size: 20
spring.datasource.hikari.idle-timeout: 30000
spring.datasource.hikari.connection-timeout: 5000
```

**[command] Check active connections** (2026-03-13)
Monitoring active PostgreSQL connections

```sql
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
```
