const connection = require('../connection/connection') ;

class User {
    #name;
    #email;


    constructor(name,  email) {
        this.#name = name;
        this.#email = email;
        
    }

    getUser() {
        return {
            name: this.#name,
            email:this.#email
        }
    }

    async addUser() {
        const isExistingUser = await connection.query(`SELECT * FROM user where lower(email)='${this.#email}'`).then(([rows, fields]) => {
            if (rows.length > 0) {
                return true;
            } else return false;
            });

        if (isExistingUser) {
            return "the username already exists in the DB. Please choose another username";
        }

        const sqlQuery = `INSERT INTO user (ID,NAME,EMAIL) VALUES (NULL,'${this.#name
        }', '${this.#email}')`;
  
        return await connection.query(sqlQuery)
            .then(([rows, fields]) => {
            return 'successfully added a new user ';
            })
            .catch((err) => err);


    }
}

module.exports = User