import ApiService from "../../apiservice";

export default class MotorService extends ApiService{

    constructor(){
        super('api/motores');
    }

    save(motor){
        console.log(motor)
        return this.post('', motor)
        
    }

    put(motor){
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
        if (motorFilter.medidaInterna) {
            params = `${params}&medidaInterna=${motorFilter.medidaInterna}`
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