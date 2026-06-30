const { z } = require('zod');

// Schema for registration endpoint
const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
        email: z.string().email({ message: 'Please provide a valid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
        role: z.enum(['user', 'mentor', 'admin']).default('user'),
        age: z.number().min(10, { message: 'Age must be at least 10 years old' })
    })
});

// Schema for login endpoint
const loginSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'Please provide a valid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' })
    })
});

// Schema for course publishing endpoint
const courseSchema = z.object({
    body: z.object({
        title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
        description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
        weeks: z.number().min(1, { message: 'Duration must be at least 1 week' }),
        tuition: z.number().min(0, { message: 'Tuition cost cannot be negative' }),
        minimumSkill: z.enum(['beginner', 'intermediate', 'advanced'])
    })
});

module.exports = {
    registerSchema,
    loginSchema,
    courseSchema
};
