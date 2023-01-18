import './Home.css';

//imporatando os hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//importando os componentes
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState("");
  const {document: posts, loading} = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='home'>
        <h1>Veja nossos posts mais recentes.</h1>
        <form onSubmit={handleSubmit} className='search_form'>
          <input type="text" placeholder='Ou busque por tags...' onChange={(e) => e.target.value}/>
          <button className='btn btn-dark'>Pesquisar</button>
        </form>
        <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.map((post) => (
            <PostDetail key={post.id} post={post}/>
          ))}
          {posts && posts.length === 0 && (
            <div className="noposts">
              <p>Não foram encontrado posts...</p>
              <Link to="/post/create" className="btn">Criar primeiro post</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home;