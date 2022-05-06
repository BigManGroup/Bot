/*
 *  Copyright (C) Junior Achievement Young Enterprise Foundation - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Jamie Stivala <jamie@jayemalta.org>, 1/2021
 *
 */

import {Response as ExpressResponse} from "express";

/**
 * The general response from the API/Database/Salesforce Wrapper
 */
export default class Response {
    status: number; //The status code of the response
    text: string; //The text shown to the front end user (if any)
    additionalInformation: any; //Any additional information (can be nothing)

    /**
     * @param status Status code of the response
     * @param text //The text shown to the front end user
     * @param additionalInformation //Any additional object that can be any object
     */
    constructor(status: number, text: string, additionalInformation: any = undefined) {
        this.status = status;
        this.text = text;
        this.additionalInformation = additionalInformation;
    }

    toExpressAPIResponse(response: ExpressResponse): void {
        response.status(this.status).json(this.toObject());
    }

    /**
     * Returns the object in an output format.
     */
    toObject(): any {
        return {
            text: this.text,
            additionalInformation: this.additionalInformation
        }
    }
}