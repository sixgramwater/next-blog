import React from 'react';
import Image from 'next/image';
import Avatar from '../components/avatar';

interface PostHeaderProps {
  title: string;
  coverImage: string;
  date: Date;
  author: {
    name: string;
    picture: string;
  }
}

const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const {
    title, coverImage, date, author
  } = props;
  return(
    <div>
      <h1 className="text-4xl font-black pt-8 pb-5">{title}</h1>
      <div className="flex align-middle h-10 my-4">
        {/* <div className="author-avator w-10 h-10 rounded-full bg-gray-300">

        </div> */}
        <Avatar src={author.picture} size={40}></Avatar>
        <h3 className="text-sm my-1 text-gray-600 ml-4 leading-7">{author.name}</h3>
      </div>
      {/* <h3 className="text-sm my-1 text-gray-600">{author.name}</h3> */}
      <h3 className="text-sm my-3 text-gray-600">{date}</h3>
      <div className="my-2">
        <Image 
          src={coverImage}
          alt="cover image"
          height={620}
          width={1240}
        />
        {/* <img src={coverImage} /> */}
      </div>
    </div>
  )
}

export default PostHeader;