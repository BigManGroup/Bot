import PeePee from "../database/model/PeePee";

export default class PeePeeCache{
    generatedPeePee : Map<string, PeePee>;

    setCache(generatedPeePee : Map <string, PeePee>) : void{
        this.generatedPeePee = generatedPeePee;
    }


}