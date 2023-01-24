import './Post.css';

//importando hooks

import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
    const {id} = useParams();
    const {documet: post} = useFetchDocument("posts", id);

  return (
    <div>
        {post && (
            <>
                <h1>{post.title}</h1>
            </>
        )}
    </div>
  )
}

export default Post;