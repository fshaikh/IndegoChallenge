import ResponseBase from "./ResponseBase";

export default class InsertDocumentResponse extends ResponseBase{
    public insertCount: number;
    public insertedId: string;
}