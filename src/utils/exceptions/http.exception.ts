
class HTTPException extends Error {
    public status: number;
    public message: string;


    constructor(status: number, mesage: string) {
        super(mesage);
        this.status = status;
        this.message = mesage;
    }
}

export default HTTPException;