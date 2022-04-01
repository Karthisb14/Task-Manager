const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId
const userOne = {
    _id: userOneId,
    name:'sam',
    email:'sam@gmail.com',
    password:'sharp123',
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const usertwoId = new mongoose.Types.ObjectId
const usertwo = {
    _id: usertwoId,
    name:'hanna',
    email:'hanna@gmail.com',
    password:'hanna123',
    tokens:[{
        token: jwt.sign({_id: usertwoId}, process.env.JWT_SECRET)
    }]
}

const taskone = {
    _id: new mongoose.Types.ObjectId(),
    description:'first task',
    completed: true,
    owner: userOne._id
}

const tasktwo = {
    _id: new mongoose.Types.ObjectId(),
    description:'second task',
    completed: true,
    owner: userOne._id
}

const taskthree = {
    _id: new mongoose.Types.ObjectId(),
    description:'third task',
    completed: true,
    owner: usertwo._id
}

const setupdatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new Task(taskone).save()
    await new Task(tasktwo).save()
    await new Task(taskthree).save()
    await new User(usertwo).save()
}

module.exports = {
    userOneId,
    userOne,
    setupdatabase,
    usertwoId,
    usertwo,
    taskone,
    tasktwo,
    taskthree
}