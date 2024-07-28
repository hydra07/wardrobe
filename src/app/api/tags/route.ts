import TagService from '@/services/tag.service';
import { NextRequest } from 'next/server';
import { res } from '../handle';

export async function GET() {
  const tagService = new TagService();
  const tags = await tagService.getAllTags();
  return res.json({ tags }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const tagService = new TagService();
  const tag = await tagService.createTag(name);
  return res.json({ tag }, { status: 201 });
}

