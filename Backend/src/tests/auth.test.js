const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

// Mock User database model completely to run tests without database dependencies
jest.mock('../models/User');

// Mock mongoose connection so it does not attempt to bind local database ports during test execution
jest.mock('mongoose', () => {
    const mockSchema = function() {
        return { 
            index: jest.fn(),
            pre: jest.fn(),
            methods: {} // Required so that schema methods can be attached in User.js
        };
    };
    mockSchema.ObjectId = 'ObjectId';
    
    return {
        connect: jest.fn().mockResolvedValue(true),
        connection: {
            close: jest.fn().mockResolvedValue(true),
            host: 'mocked-mongo-server'
        },
        Schema: mockSchema,
        model: jest.fn().mockImplementation((name, schema) => {
            return {
                index: jest.fn(),
                create: jest.fn(),
                findOne: jest.fn(),
                findById: jest.fn()
            };
        })
    };
});

describe('Auth Endpoint Mocked Integration Tests', () => {
    
    it('should register a new user and set secure refresh cookie', async () => {
        // Setup mock response details for User creation
        User.create.mockResolvedValue({
            _id: 'mockuser123',
            name: 'Test Engineer',
            email: 'test.eng@example.com',
            role: 'user',
            getSignedJwtToken: () => 'mock-access-token',
            getSignedRefreshToken: () => 'mock-refresh-token'
        });

        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test Engineer',
                email: 'test.eng@example.com',
                password: 'securepassword123',
                age: 28,
                role: 'user'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.accessToken).toEqual('mock-access-token');
        expect(res.headers['set-cookie']).toBeDefined(); // Contains refresh token cookie
    });

    it('should throw validation error if age is less than 10', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Young Student',
                email: 'student@example.com',
                password: 'password123',
                age: 8, // Zod schema validation throws if age < 10
                role: 'user'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toContain('Validation Error');
        expect(res.body.error).toContain('age: Age must be at least 10 years old');
    });

    it('should authenticate user and return access token', async () => {
        User.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                _id: 'mockuser123',
                name: 'Login Test',
                email: 'login@example.com',
                role: 'user',
                matchPassword: jest.fn().mockResolvedValue(true),
                getSignedJwtToken: () => 'mock-access-token',
                getSignedRefreshToken: () => 'mock-refresh-token'
            })
        });

        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.accessToken).toEqual('mock-access-token');
        expect(res.headers['set-cookie']).toBeDefined();
    });
});
