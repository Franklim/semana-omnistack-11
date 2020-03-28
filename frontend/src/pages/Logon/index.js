import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import './style.css';
import {FiLogIn} from 'react-icons/fi';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from  '../../services/api'
function Logon(){
    const[id,setId] = useState('');

    const history = useHistory();
    async function handleLogon(e){
        e.preventDefault();

        try {
            const response = await api.post('session', {id});
            const name = response.data.name;

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', name)

            history.push('/profile')

        } catch (error) {
            alert('Erro ao tentar fazer login. Tente novamente. '+error)
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero!"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu login</h1>
                    <input 
                        value={id}
                        onChange={e=>setId(e.target.value)}
                        placeholder="Sua ID" />

                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho registro.
                    </Link>
                </form>
            </section>
            
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

export default Logon;