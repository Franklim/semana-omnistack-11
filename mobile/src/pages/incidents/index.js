import React,{useState,useEffect} from 'react';
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native'
import logoImg from '../../assets/logo.png'
import styles  from './styles'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api'

function Incidents(){
    const[incidents,setIncidents] = useState([]);
    const[total, setTotal] = useState(0);
    const[loading, setLoading] = useState(false)
    const[page, setPage] = useState(1);

    const navigation = useNavigation();

    async function loadIncidents(){
        if(loading || (total >0 && total == incidents.length)){
            return;
        }
        
        const response = await api.get('incidents?page='+page);
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page+1)
        setLoading(false)
    }

    useEffect(()=>{
        loadIncidents();
    }, [])

    function navigateToDatails(incident){
        navigation.navigate('Details', {incident})
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>

            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                style={styles.incidentList} 
                data={incidents} 
                keyExtractor={incident => String(incident.id)} 
                renderItem={({item:incident}) =>(
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.id} - {incident.title}</Text>
        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity onPress={()=>navigateToDatails(incident)} style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
            )}/>

            
        </View>

    );
}

export default Incidents;
