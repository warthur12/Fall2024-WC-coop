const { SQLDataSource } = require("datasource-sql");

class UserDatabase extends SQLDataSource  {
    getUsers() {
        return this.knex
            .select("*")
            .from("users");
    }
}

module.exports = UserDatabase;