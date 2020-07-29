import Big from "../database/model/Big";

export default class BigCache{
    generatedBig : Map<string, Big>;

    setCache(generatedBig : Map <string, Big>) : void{
        this.generatedBig = generatedBig;
    }
}