import * as express from "express";
import { EventType } from "../constants/EventType";
import CareEvent from "../models/CareEvent";

export const mainController = express.Router();

mainController.get('/recipients', (_, res) => {
    const careEvent = new CareEvent("1333444", EventType.ALERT_RAISED, new Date());
    const result = careEvent
    .where('caregiver_id', '>', '1')
    .select(['id']).take(1).get();

    console.log(result);
    
    res.status(200).json({
        greetings: 'All Recipients'
    });
});

