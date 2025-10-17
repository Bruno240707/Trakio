-- Migration: add 'activo' column to workers (idempotent)
-- This script checks for the column and index and only creates them if missing.

-- 1) Add column only if it doesn't exist
SET @cnt := (
	SELECT COUNT(*)
	FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_SCHEMA = DATABASE()
		AND TABLE_NAME = 'workers'
		AND COLUMN_NAME = 'activo'
);

SET @sql := IF(@cnt = 0,
	'ALTER TABLE workers ADD COLUMN activo TINYINT(1) DEFAULT 1',
	'SELECT "activo column already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2) Ensure column has NOT NULL and DEFAULT 1
ALTER TABLE workers MODIFY activo TINYINT(1) NOT NULL DEFAULT 1;

-- 3) Normalize existing rows (no NULLs)
UPDATE workers SET activo = 1 WHERE activo IS NULL;

-- 4) Create index on activo only if it doesn't exist
SET @idx := (
	SELECT COUNT(*)
	FROM INFORMATION_SCHEMA.STATISTICS
	WHERE TABLE_SCHEMA = DATABASE()
		AND TABLE_NAME = 'workers'
		AND INDEX_NAME = 'idx_workers_activo'
);

SET @sql2 := IF(@idx = 0,
	'CREATE INDEX idx_workers_activo ON workers (activo)',
	'SELECT "index already exists"'
);
PREPARE stmt2 FROM @sql2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

-- Done