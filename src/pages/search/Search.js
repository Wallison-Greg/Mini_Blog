import './Search.css';

import React from 'react';

//importando os hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';

//importando componentes
import PostDetail from '../../components/PostDetail';

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts", search);

  return (
    <div className='search_container'>
        <h2>Search</h2>
        <div>
          {posts && posts.length === 0 && (
            <div className='nopost'>
              <p>Não foram encontrados posts a partir da sua busca...</p>
              <Link to="/" className="btn btn-dark">
                Voltar
              </Link>
            </div>
          )}

          {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
    </div>
  )
}

export default Search;