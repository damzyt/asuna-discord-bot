async function errors() {
    process.on('unhandledRejection', async(error) => {
        console.log(`[ERROR] ${error.stack}`)
    })

    process.on('uncaughtException', async(error) => {
        console.log(`[ERROR] ${error.stack}`)
    })
}

module.exports = errors