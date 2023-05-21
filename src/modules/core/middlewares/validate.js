module.exports = (schema) => {
    return (req, res, next) => {
        schema.validate(req.body, {abortEarly: false})
            .then(() => next())
            .catch(err => {
                const errorMessage = {
                    path: err.inner[0].path, 
                    message: err.inner[0].message
                }
                
                return res.status(400).send(errorMessage);
            })
    }
}
