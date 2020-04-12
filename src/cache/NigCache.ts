import Nig from "../database/model/Nig";

export default class NigCache{
    generatedNig : Map<string, Nig>;

    setCache(generatedNig : Map <string, Nig>) : void{
        this.generatedNig = generatedNig;
    }
}