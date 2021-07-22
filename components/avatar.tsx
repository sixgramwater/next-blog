import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  size: number;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, size } = props;
  return(
    <div className="overflow-hidden rounded-full bg-gray-300" style={{width: size, height: size}}>
      <Image
        src={src}
        alt="avatar"
        width={size}
        height={size}
      >

      </Image>
    </div>
  )
}

export default Avatar;