-- No log messages.
\set QUIET true
SET client_min_messages TO WARNING;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;

-- Enable log messages again.
SET client_min_messages TO NOTICE;
\set QUIET false

-- Stop on errors
\set ON_ERROR_STOP on