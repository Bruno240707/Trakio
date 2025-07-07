entrada y salida x fecha de base de datos:
WITH eventos_filtrados AS (
  SELECT *
  FROM eventos
  WHERE 
    event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
    AND DATE(created_at) =  '2025-04-22'
),
numerados AS (
  SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY worker_id, DATE(created_at)
           ORDER BY created_at
         ) - 1 AS evento_previo_count
  FROM eventos_filtrados
)
SELECT *,
       CASE 
         WHEN MOD(evento_previo_count, 2) = 0 THEN 'Entrance'
         ELSE 'Exit'
       END AS event_direction
FROM numerados
WHERE created_at >= '2025-04-22 00:00:00'
ORDER BY created_at;

-----------------------------------------------------------

entrada y salida por fecha actual:
WITH eventos_filtrados AS (
  SELECT *
  FROM eventos
  WHERE 
    event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
    AND DATE(created_at) = CURDATE()
),
numerados AS (
  SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY worker_id, DATE(created_at)
           ORDER BY created_at
         ) - 1 AS evento_previo_count
  FROM eventos_filtrados
)
SELECT *,
       CASE 
         WHEN MOD(evento_previo_count, 2) = 0 THEN 'Entrance'
         ELSE 'Exit'
       END AS event_direction
FROM numerados
WHERE created_at >= CURDATE()
ORDER BY created_at;
