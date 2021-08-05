
import BaseModel from "./BaseModel";

class CareEvent extends BaseModel {
    protected table = "events";
    
    constructor() {
        super();
    }
}

export default CareEvent;