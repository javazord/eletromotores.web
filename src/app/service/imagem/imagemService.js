import ApiService from "../../apiservice";

export class ImagemService extends ApiService{

    constructor(){
        super('api/upload');
    }

    save(file){
        return this.post('', file)
    }

}
