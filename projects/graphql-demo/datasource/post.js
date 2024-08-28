const { SQLDataSource } = require("datasource-sql");

class PostDatabase extends SQLDataSource  {
    getUsers() {
        return this.knex
            .select("*")
            .from("posts");
    }
}

module.exports = PostDatabase;