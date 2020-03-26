const connection = require('../database/connection')

module.exports = {

    async create(request,response){
        const{title,description,value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value
        })

        return response.json({id})
    },

    async listAll(request,response){
        const [count] = await connection('incidents').count();
        response.header('X-Total-Count', count['count(*)'])
        
        const {page = 1} = request.query;
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.state'

        ]);


        return response.json(incidents);
    },

    async listByOng(request, response){
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents').where('ong_id',ong_id).select('*');
        return response.json(incidents);

    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        
        const incident = await connection('incidents').where('id',id).select('ong_id').first();

        console.log("ID="+id);
        console.log("ONG_ID="+ong_id);
        console.log("INCIDENT.ONG_ID="+incident.ong_id);

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not authorized.'})
        }

        await connection('incidents').where('id',id).delete();
        return response.status(204).send();
    }

}