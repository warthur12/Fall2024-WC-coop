const { SQLDataSource } = require("datasource-sql");

class Database extends SQLDataSource  {
    getUsers() {
        return this.knex
            .select("*")
            .from("Posts, Users")
    }
}

module.exports = Database;