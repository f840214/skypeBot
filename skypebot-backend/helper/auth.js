const auth={};

const checkRole = (roles) => (req, res, next) => {
    if (!req.session.role && !roles.includes(req.session.role)) {
        res.status(403).send('未登入，或無訪問權限');
    } else {
        next()
    }
}
// 驗證是否為 admin
auth.checkAdmin = checkRole(['admin']);
// 驗證是否為 user
auth.checkUser = checkRole(['admin','user']);
module.exports = auth;