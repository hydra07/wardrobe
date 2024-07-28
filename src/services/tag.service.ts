'use server';
import Tag from '@/models/tag.model';

class TagService {
  async createTag(name: string): Promise<InstanceType<typeof Tag>> {
    const tag = new Tag({ name });
    return await tag.save();
  }

  async getAllTags(): Promise<InstanceType<typeof Tag>[]> {
    return await Tag.find();
  }
}

export default TagService;
