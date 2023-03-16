import ApiService from "../../apiservice";

export class MotorService extends ApiService{

    constructor(){
        super('api/motores');
    }

    save(motor){
        return this.post('', motor)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    update(motor){
        return this.put(`/${motor.id}`, motor)
    }

    search(motorFilter){
        let params = `?marca=${motorFilter.marca}`

        if (motorFilter.modelo) {
            params = `${params}&modelo=${motorFilter.modelo}`
        }
        if (motorFilter.ranhuras) {
            params = `${params}&ranhuras=${motorFilter.ranhuras}`
        }
        if (motorFilter.comprimento) {
            params = `${params}&comprimento=${motorFilter.comprimento}`
        }
        if (motorFilter.medidaExterna) {
            params = `${params}&medidaExterna=${motorFilter.medidaExterna}`
        }
        if (motorFilter.potencia) {
            params = `${params}&potencia=${motorFilter.potencia}`
        }
        
                
        return this.get(params)
    }


}