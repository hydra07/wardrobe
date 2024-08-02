// 'use server';
import initializeDatabase from './configs/database';
// file này dùng để initialize các thứ cần thiết cho server chạy, như database, cache, etc.
export async function register() {
  await initializeDatabase();
}
