import './CreatePost.css'

//importando o hook
import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInserDocument';

//importando as rotas 
import { useNavigate } from 'react-router-dom';

//importando context
import { useAuthValue} from '../../context/AuthContext';

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");

  const {user} = useAuthValue();

  const navigate = useNavigate();

  function handleSubmit (e){
    e.preventDefault();

    setFormError("")

    //validate URL image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    //create array of tags 
    const arrayTags = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checked value

    if(!title || !image || !body || !tags){
      setFormError("Preencha todos os campos!")
    }

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tags: arrayTags,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirect to home page
    navigate("/");
  }

  return (
    <div className='create_post'>
      <h2>Criar Post</h2>
      <p>Escreva sobre oque quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input 
            type="text" 
            placeholder='Pense em um bom titulo...' 
            name='title'
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            placeholder='Escolha uma imagem que represente o seu post...' 
            name='image'
            required
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteudo:</span>
          <textarea 
            name="body"
            required
            placeholder='Insira o conteudo do post'
            onChange={(e) => setBody(e.target.value)} 
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            placeholder='Insira as tags separadas por virgula' 
            name='tags'
            required
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost;