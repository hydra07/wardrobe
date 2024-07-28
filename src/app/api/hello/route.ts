import { res } from '../handle';

export async function GET() {
  return res.json({ message: 'Hello from Next.js!' }, { status: 202 });
}
