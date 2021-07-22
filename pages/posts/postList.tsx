import React from 'react';
import { postType } from './[id]';
import { useRouter } from 'next/router'

interface PostListProps {
  posts: postType[];
}

const PostList: React.FC<PostListProps> = (props) => {
  const { posts } = props;
  const router = useRouter();
  return(
    <ul>
      <li></li>
      <li></li>
      
      {
        posts.map((post, index)=>(
          <li 
          className="cursor-pointer"
          key={post.id} 
          onClick={()=>{
            router.push(`/posts/${post.id}`)
          }}>
            {post.title}
          </li>
        ))
      }
    </ul>
  )
}

export default PostList;

export async function getStaticProps() {
  const res = await fetch('http://localhost:3002/posts');
  const posts = await res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }

}