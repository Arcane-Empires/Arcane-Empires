import bcrypt from 'bcryptjs';

// Validate password
const validatePwd = (password) => {
    const regex = /^(?=.{5,30}$)(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).*/; // might be unsafe and expensive
    return regex.test(password);
};

// Hash password
const hashPwd = async (password) => {
    if (!validatePwd(password)) {
        throw new Error('trash detected');
    }
    const saltRounds = 2; // 10 minimum, 2 is for testing
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

// Usage
(async () => {
    try {
        const password = 'invalid'; // test should come from frontend
        const hashedPwd = await hashPwd(password);
        console.log('hashed -> ', hashedPwd);
    } catch (error) {
        console.error(error.message);
    }
})();