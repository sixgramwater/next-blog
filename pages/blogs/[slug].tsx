import React from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import poster from '../../public/nature.jpg';
import { getAllPosts, getPostBySlug } from '../api/posts';
import markdownToHtml from '../api/markdownToHtml';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';

export type postType = {
  title: string;
  coverImage: string;
  author: {
    name: string;
    picture: string;
  }
  date: Date;
  content: string;
  id: string;
  slug: string;
}

export interface PostProps {
  post: postType; 
}

const Blog: React.FC<PostProps> = (props) => {
  const {
    post
  } = props;
  return (
    <div className="mx-2.5 sm:mx-auto">
      <div>
        <PostHeader 
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content}></PostBody>
        {/* <p className="text-base font-sans text-gray-900 leading-6">{post.content}</p> */}
        {/* {post.content} */}
      </div>

    </div>
  )
}

export default Blog;

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  // console.log(posts);
  // const res = await fetch('http://localhost:3002/posts');
  // const posts = await res.json() as postType[];

  // get all paths we need to pre-render based on posts
  const paths = posts.map(post => ({
    params: {slug: post.slug}
  }))

  return {
    paths,
    fallback: false
  }
}

type Params = {
  params: {
    slug: string
  }
}

export const getStaticProps= async ({params}: Params) => {
  // if(!params) return;
  // const res = await fetch(`http://localhost:3002/posts/${params!.id}`); // not null assert
  // const post = await res.json();
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
  ])
  // console.log(post);
  const content = await markdownToHtml(post.content || '');
  // console.log(post);

  return {
    props: {
      post:{
        ...post,
        content
      }
    }
  }
}

// export async function getStaticProps({params}) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`http://localhost:3002/posts/${params.id}`);

// }



