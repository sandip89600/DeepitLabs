const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock User database model completely to run tests without database dependencies
jest.mock('../models/User');

// Mock mongoose connection so it does not attempt to bind local database ports during test execution
jest.mock('mongoose', () => {
    const mockSchema = function() {
        return { 
            index: jest.fn(),
            pre: jest.fn(),
            methods: {}
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

describe('Deep IT Labs - Auth System Diagnostic Test Suite', () => {
    // Generate valid signed tokens using standard secrets for testing
    const jwtSecret = process.env.JWT_SECRET || 'secret123';
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refreshsecret123';
    
    const validAccessToken = jwt.sign({ id: 'mockuser123' }, jwtSecret, { expiresIn: '15m' });
    const validRefreshToken = jwt.sign({ id: 'mockuser123' }, jwtRefreshSecret, { expiresIn: '30d' });

    beforeEach(() => {
        // Enforce secrets exist in env
        process.env.JWT_SECRET = jwtSecret;
        process.env.JWT_REFRESH_SECRET = jwtRefreshSecret;
    });

    it('Stage 1: Register New User & Cookie Setup', async () => {
        User.create.mockResolvedValue({
            _id: 'mockuser123',
            name: 'Diag User',
            email: 'diag@example.com',
            role: 'user',
            getSignedJwtToken: () => validAccessToken,
            getSignedRefreshToken: () => validRefreshToken
        });

        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Diag User',
                email: 'diag@example.com',
                password: 'securepassword123',
                age: 22,
                role: 'user'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.accessToken).toBeDefined();
        
        // Assert CORS credentials header is present
        expect(res.headers['access-control-allow-credentials']).toBe('true');
        
        // Assert httpOnly cookie is present in response headers
        expect(res.headers['set-cookie']).toBeDefined();
        expect(res.headers['set-cookie'][0]).toContain('HttpOnly');
    });

    it('Stage 2: Login Authentications & Token Delivery', async () => {
        User.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                _id: 'mockuser123',
                name: 'Diag User',
                email: 'diag@example.com',
                role: 'user',
                matchPassword: jest.fn().mockResolvedValue(true),
                getSignedJwtToken: () => validAccessToken,
                getSignedRefreshToken: () => validRefreshToken
            })
        });

        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'diag@example.com',
                password: 'securepassword123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.accessToken).toBeDefined();
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('Stage 3: Protected Route Access Guard Checks', async () => {
        // Mock user lookup by middleware protect
        User.findById.mockResolvedValue({
            _id: 'mockuser123',
            name: 'Diag User',
            email: 'diag@example.com',
            role: 'user'
        });

        const res = await request(app)
            .get('/api/v1/auth/me')
            .set('Authorization', `Bearer ${validAccessToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe('diag@example.com');
    });

    it('Stage 4: Refresh Token rotation & Revocations', async () => {
        User.findById.mockResolvedValue({
            _id: 'mockuser123',
            name: 'Diag User',
            email: 'diag@example.com',
            role: 'user',
            getSignedJwtToken: () => validAccessToken,
            getSignedRefreshToken: () => validRefreshToken
        });

        const res = await request(app)
            .post('/api/v1/auth/refresh')
            .set('Cookie', [`refreshToken=${validRefreshToken}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.accessToken).toBe(validAccessToken);
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('Stage 5: Logout Session clear', async () => {
        const res = await request(app)
            .post('/api/v1/auth/logout')
            .set('Cookie', [`refreshToken=${validRefreshToken}`])
            .set('Authorization', `Bearer ${validAccessToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.headers['set-cookie'][0]).toContain('refreshToken=none');
    });
});
