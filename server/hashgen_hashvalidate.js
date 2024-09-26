const bcrypt = require('bcryptjs');
//validate pass
function validatepwd(password) {
    const regex = /^(?=.{5,30}$)(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).*/;//might be unsafe and expensive
    return regex.test(password);
}
//hash pwd
async function hashpwd(password) {
    if (!validatepwd(password)) {
        throw new Error('trash detected');
    }
    const saltRounds = 2;//10 minimium,  2 is for testinf
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

//usage
(async () => {
    try {
        const password = 'invalid';//test should come from frontend
        const hashedpwd = await hashpwd(password);
        console.log('hashed -> ', hashedpwd);
    } catch (error) {
        console.error(error.message);
    }
})();
