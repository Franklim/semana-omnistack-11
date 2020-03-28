import React, {useState} from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'
function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        }

        try {
            const response = await api.post('ongs', data)
            alert("ID:"+ response.data.id)
            history.push("/")

        } catch (error) {
            alert("Erro ao tentar salvar a ong, tente novamente. " + error)    
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero!"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrar os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho registro.
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    
                    <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />

                    <input 
                    value ={whatsapp}
                    onChange={e=> setWhatsapp(e.target.value)}
                    placeholder="Whatsapp"/>

                    <div className="input-group">
                        <input 
                        value={city}
                        onChange={e=> setCity(e.target.value)}
                        placeholder="Cidade"/>
                        
                        <input 
                        value={state}
                        onChange={e=>setState(e.target.value)}
                        placeholder="UF" style={{width:80}}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;