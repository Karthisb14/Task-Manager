const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    userOneId, 
    userOne, 
    setupdatabase, 
    usertwo, 
    usertwoId,
    taskone,
    tasktwo,  
    taskthree} = require('./fixtures/db')

beforeEach(setupdatabase)

test('should create new task', async() => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description:'is it good'
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('should read task', async() => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(2)

})

test('should not delete user 2 by user1', async() => {
    const response = await request(app)
    .delete(`/tasks/${taskone._id}`)
    .set('Authorization', `Bearer ${usertwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskone._id)
    expect(task).not.toBeNull
})