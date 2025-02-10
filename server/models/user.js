class User {
    constructor(id, uuid, username, password, role) {
        this.id = id || null;
        this.uuid = uuid || null;
        this.username = username || null;
        this.password = password || null;
        this.role = role || null;
        this.refreshToken = null;
    }

    setRefreshToken(newRefreshToken) {
        this.refreshToken = newRefreshToken;
    }
}
export default User;