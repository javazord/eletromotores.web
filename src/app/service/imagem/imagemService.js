import ApiService from "../../apiservice";

export class ImagemService extends ApiService{

    constructor(){
        super('api/imagem');
    }

    save(formData){
        return this.post('', formData)
    }

    search(id){
        return this.get(`/${id}`)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

}
