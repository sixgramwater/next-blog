import React from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import poster from '../../public/nature.jpg';
import { promises as fs } from 'fs'
import path from 'path'

export type postType = {
  title: string;
  coverImage: string;
  author: string;
  date: Date;
  content: string;
  id: string;
  slug: string;
}

export interface PostProps {
  post: postType; 
}

const Post: React.FC<PostProps> = (props) => {
  const {
    post
  } = props;
  return (
    <div className="mx-2.5 sm:mx-auto">
      <h1 className="text-4xl font-black pt-8 pb-5">{post.title}</h1>
      <h3 className="text-sm my-1 text-gray-600">{post.author}</h3>
      <h3 className="text-sm my-1 text-gray-600">{post.date}</h3>
      <div className="my-2">
        <Image 
          src={poster}
          alt="cover image"
        />
        {/* <img src={post.coverImage} /> */}
      </div>
      <div className="my-3">
        <p className="text-base font-sans text-gray-900 leading-6">{post.content}</p>
        {/* {post.content} */}
      </div>

    </div>
  )
}

export default Post;

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3002/posts');
  const posts = await res.json() as postType[];

  // get all paths we need to pre-render based on posts
  const paths = posts.map(post => ({
    params: {id: post.id}
  }))

  return {
    paths,
    fallback: false
  }
  // return {
  //   paths: [
  //     { params: { id: '1' } },
  //     { params: { id: '2' } }
  //   ],
  //   fallback: ...
  // }
}

export const getStaticProps: GetStaticProps = async ({params}: GetStaticPropsContext) => {
  // if(!params) return;
  const res = await fetch(`http://localhost:3002/posts/${params!.id}`); // not null assert
  const post = await res.json();

  // console.log(post);

  return {
    props: {
      post
    }
  }
}

// export async function getStaticProps({params}) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`http://localhost:3002/posts/${params.id}`);

// }



