-- Setup environment
-- Create database 
CREATE DATABASE IF NOT EXISTS msdos;i
-- Switch to connected database 
\c msdos


-- Drop everything
\i clean.sql

-- Add tables
\i tables.sql

-- Add generated data from tools
\i tools/inserts.sql

-- Add additional data
\i inserts.sql
