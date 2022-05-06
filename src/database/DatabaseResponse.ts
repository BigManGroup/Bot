import {MongoError, ObjectId} from "mongodb";
import Response from "../tools/response/Response";
import DetailedResponse from "../tools/response/DetailedResponse";

export default class DatabaseResponse{
    /**
     * Error for when on insertion, a duplicate entry is found
     * @param error The error from the Database
     */
    static duplicateEntry(error: MongoError): Response {
        let res = new Response(409, "Duplicate entry");
        res.additionalInformation = error;
        return res;
    }

    /**
     * Error for when on insertion, a NOT_NULL field is left missing
     * @param error The error from the Database
     */
    static missingField(error: MongoError): Response {
        let res = new Response(422, "Missing field");
        res.additionalInformation = error;
        return res;
    }

    /**
     * Error for when on SELECT, an entry is not found
     */
    static entryNotFound(): Response {
        return new Response(404, "Not found");
    }

    /**
     * Error for when an unknown error is thrown
     * @param error The error from the database
     */
    static unknownError(error: MongoError): Response {
        let res = new Response(400, "Unknown error");
        res.additionalInformation = error;
        return res;
    }

    /**
     * The response for when a field is properly added
     */
    static fieldAdded(id: ObjectId): Response {
        return new Response(201, "Field added");
    }

    /**
     * The response for when a field is properly updated
     */
    static fieldUpdated(): Response {
        return new Response(202, "Field updated");
    }

    /**
     * The response for when a field is deleted
     */
    static fieldsDeleted(): Response {
        return new Response(200, "Field deleted");
    }

    /**
     * The response for when a field is found.
     * Initially it checks if the result is undefined or if the length of the array for the result is 0.  If so, entry not found is thrown.
     *
     * @param result The result from the database
     */
    static fieldsFound<T>(result: T): DetailedResponse<T> {
        if (result === undefined) return DatabaseResponse.entryNotFound();
        return new DetailedResponse(200, "Fields found", result);
    }

    static multipleFieldsFound() : Response{
        return new Response(400, "Expected one item, found multiple.")
    }

    /**
     * Maps out the errors from the database to code-readable errors
     * @param error The error from the database
     */
    static errorMapper(error: MongoError): Response {
        switch (error.code) {
            case 11000: //Duplicate entry
                return DatabaseResponse.duplicateEntry(error);
            case ("ER_BAD_NULL_ERROR"): //Missing field error
                return DatabaseResponse.missingField(error);
            default:
                console.error("Unknown database error occurred " + error); //Other unknown error
                return DatabaseResponse.unknownError(error);
        }
    }
}