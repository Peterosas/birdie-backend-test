import { EventType } from "../constants/EventType";
import BaseModel from "./BaseModel";

class CareEvent extends BaseModel {
    protected table = "events";
    
    constructor(public caregiverId: string, public eventType: EventType, public timestamp: Date) {
        super();
    }
}

export default CareEvent;