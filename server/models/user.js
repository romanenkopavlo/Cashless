class User {
    constructor(id, username, password, role) {
        this.id = id || null;
        this.username = username || null;
        this.password = password || null;
        this.role = role || null;
        this.refreshToken = null;
    }

    createRefreshToken(newRefreshToken) {
        this.refreshToken = newRefreshToken;
    }
}
export default User;