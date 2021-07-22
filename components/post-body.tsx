import React from 'react';
import markdownStyles from './markdown-styles.module.css';

interface PostBodyProps {
  content: string;
}

const PostBody:React.FC<PostBodyProps> = (props) => {
  const { content } = props;

  return(
    <div>
      <div className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}>
      
      
      </div>
    </div>
  )
}

export default PostBody;