import * as express from "express";
import CareEvent from "../models/CareEvent";

export const mainController = express.Router();

mainController.get('/patients', (_, res) => {
    const careEvent = new CareEvent();
    careEvent.take(100).get((result) => {
        res.status(200).json({
            status: 200,
            message: "Fetched successfully",
            data: result
        });
    });

});

