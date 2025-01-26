class User {
    constructor(id, username, password, role) {
        this.id = id || null;
        this.username = username || null;
        this.password = password || null;
        this.role = role || null;
    }
}
export default User;