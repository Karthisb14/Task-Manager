const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { response } = require('../src/app')
const {userOneId, userOne, setupdatabase} = require('./fixtures/db')

beforeEach(setupdatabase)

test('signup new user', async() => {
    
    const response = await request(app).post('/signup').send({
        name:'Karthi',
        email: 'karthikeyan@gmail.com',
        password:'donu123!!',
    }).expect(201)


    // fetch the user from database
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name:'Karthi',
            email: 'karthikeyan@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('donu123!!')
})


test('login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.tokens).not.toBe(user.tokens[1].token)
})

test('should not login non existing user', async() => {
    await request(app).post('/users/login').send({
        email:'karthi@xo.io',
        password:'katrthikeji'
    }).expect(400)
})

test('should get user profile', async() => {
    await request(app)
    .get('/users/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('shoult not get user profile', async() => {
    await request(app)
    .get('/users/profile')
    .send()
    .expect(401)
})

test('should delete account for user', async() => {
    await request(app)
    .delete('/users/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should delete unauthorized user account', async() => {
    await request(app)
    .delete('/users/profile')
    .send()
    .expect(401)
})

test('should upload avatar', async() => {
    await request(app)
    .post('/users/profile/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/philly.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user field', async() => {
    await request(app)
    .patch('/users/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'sanjay'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('sanjay')
})

test('should not update invalid user field', async() => {
    await request(app)
    .patch('/users/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'india'
    })
    .expect(400)
})