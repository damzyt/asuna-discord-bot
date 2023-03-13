module.exports = {
    name: "err",
    execute(err) {
        console.log(`[DATABASE] An error occured with the database connection: \n${err}`)
    }
}