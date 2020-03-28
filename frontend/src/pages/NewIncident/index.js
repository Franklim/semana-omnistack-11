import React, {useState} from 'react'
import './style.css'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

function NewIncident(){
    const [title, setTitle] = useState("") 
    const [description, setDescription] = useState("") 
    const [value, setValue] = useState("") 

    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault();
        
        const data = {
            title,
            description,
            value
        }

      try {
        const response = await api.post('incidents', data,{
            headers:{
                authorization:ongId,
            }
        })
  
        alert("INCIDENT ID: "+ response.data.id)
        history.push('/profile')
      } catch (error) {
          alert('Erro ao tentar gravar incidente. Tente novamente. '+error)
      }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero!"/>
                <h1>Cadastrar Novo Caso</h1>
                <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home.
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                value={title}
                onChange={e =>setTitle(e.target.value)}
                placeholder="Titulo da descrição"/>
                
                <textarea 
                value={description}
                onChange={e=> setDescription(e.target.value)}
                placeholder="Descrição"/>
                
                <input 
                value={value}
                onChange={e=>setValue(e.target.value)}
                placeholder="Valor em reais"/>

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}

export default NewIncident;