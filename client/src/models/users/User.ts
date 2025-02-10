export default class User  {
    id: number | null = null
    username: string | null = null
    role: string | null = null

    constructor(id_user: number | null, username: string | null, role: string | null) {
        this.id = id_user
        this.username = username
        this.role = role
    }
}
