import request from 'supertest';
import mongoose from 'mongoose';
import server from '../server.js'; 
import User from '../models/UserModel.js';

const userOne = {
    fullName: 'Test User',
    email: 'test@example.com',
    password: 'password123'
};

beforeAll(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe('User API Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(server)
            .post('/api/auth/signup')
            .send(userOne);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with existing email', async () => {
        const res = await request(server)
            .post('/api/auth/signup')
            .send(userOne);
        expect(res.statusCode).toEqual(400);
    });

    it('should login user and return token', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                email: userOne.email,
                password: userOne.password
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                email: userOne.email,
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
    });

    it('should reject invalid email format', async () => {
        const res = await request(server)
            .post('/api/auth/signup')
            .send({
                fullName: 'Bad Email',
                email: 'notanemail',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
    });
});