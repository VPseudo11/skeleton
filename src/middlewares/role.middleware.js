const adminValidate = (req, res, next) => {
    const role = req.user.role
    if (role === 'admin') {
        return next()
    }
    return res.status(401).json({ message: 'acces denny' })
}

module.exports = adminValidate