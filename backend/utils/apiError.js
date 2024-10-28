class ApiError extends Error{
    constructor(statusCode,message,errors = [] , status = "fail"){
        super(message)
        this.message = message
        this.errors = errors
        this.statusCode = statusCode
        this.data = null
        this.status = status
    }
}
module.exports = ApiError
