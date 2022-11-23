const usersControllers = require('./users.controllers')

const getAllUsers = (req, res) => {
    usersControllers.getAllUsers()
        .then(data => { res.status(200).json(data) })
        .catch(err => { res.status(400).json({ message: err.message }) })
}

const getUserById = (req, res) => {
    const id = req.params.id

    usersControllers.getUsersById(id)
        .then(data => { res.status(200).json(data) })
        .catch(err => { res.status(404).json({ message: err.message }) })
}

const postUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body

    if (firstName && lastName && email && password && phone && birthday) {
        usersControllers.createUser({ firstName, lastName, email, password, phone, birthday, gender, country })
            .then(data => { res.status(200).json(data) })
            .catch(err => { res.status(400).json({ message: err.message }) })
    } else {
        res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                firstName: 'string',
                lastName: 'string',
                email: 'example@example.com',
                password: 'string',
                phone: '+593999999999',
                birthday: 'YYYY/MM/DD'
            }
        })
    }
}

const patchUser = (req, res) => {
    const id = req.params.id
    const { firstName, lastName, phone, birthday, gender, country } = req.body

    usersControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
        .then(data => {
            if (data[0]) {
                res.status(200).json({ message: `User with id: ${id}, edited succesfull` })
            } else {
                res.status(400).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => { res.status(404).json({ message: err.message }) })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    usersControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(400).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => { res.status(400).json({ message: err.message }) })
}

const getMyUser = (req, res) => {
    const id = req.user.id
    usersControllers.getUsersById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { res.status(400).json({ message: err.message }) })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { firstName, lastName, phone, birthday, gender, country } = req.body

    usersControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
        .then(() => {
            res.status(200).json({ message: `User with id: ${id}, edited succesfull` })
        })
        .catch(err => { res.status(404).json({ message: err.message }) })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    usersControllers.updateUser(id, { status: 'inactive' })
        .then(() => res.status(200).json({ message: 'your account has been deactivated' }))
        .then(err => res.status(400).json({ message: err.message }))
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
}