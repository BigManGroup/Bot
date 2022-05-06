import Response from "./Response";

export default class DetailedResponse<T> extends Response {
    declare additionalInformation: T;
}