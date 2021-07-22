import fs from 'fs'
import { join } from 'path';
import { postType } from '../posts/[id]';
import matter from 'gray-matter';

export type fieldItemType = keyof postType;
// export type fieldType = fieldItemType[];
const postDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postDirectory);
}

export function getPostBySlug(slug: string, fields: fieldItemType[] = []): postType {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postDirectory, `${realSlug}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContent);

  let items: any = {};
  fields.map(field=>{
    if(field === 'slug') {
      items[field] = realSlug;
    }
    if(field === 'content') {
      items[field] = content;
    }
    if(data[field]) {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllPosts(fields: fieldItemType[] = []){
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug=>getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2)=>(post1.date > post2.date ? -1 : 1));
  return posts;
}