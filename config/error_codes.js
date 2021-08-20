module.exports = {
    ERROR_RESPONSE: (info) => {
        return {
            emsg: "Something goes wrong!",
            info: info,
            code: 5000,
            http_status: 403
        }
    },
}