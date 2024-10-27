class ApiResponse {
    constructor(message , data , statusCode , status = "success"){
        this.statusCode = statusCode
        this.message = message 
        this.data = data
        this.status = status
    }
}

module.exports = ApiResponse;