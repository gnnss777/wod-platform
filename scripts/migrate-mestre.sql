-- Add 'MESTRE' to the UserRole enum and update existing users
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'MESTRE';

UPDATE "User" SET role = 'MESTRE' WHERE role = 'NARRADOR';
