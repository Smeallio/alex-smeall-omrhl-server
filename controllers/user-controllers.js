const bcrypt = require('bcryptjs');
const knex = require("knex")(require("../knexfile"));
const jwt = require('jsonwebtoken');

const getUser = async (_req, res) => {
    try {
        const users = await knex("users").select("*").from("users")
        res.json(users);
    } catch(err) {
        res.status(500).send(`Error retieving users from the database: ${err}`)
    }
}


const createUser = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password);

    const newUser = {
        username,
        password: hashedPassword
    }

    try {
        await knex("users").insert(newUser);
        res.status(201).send("Registered successfully");
    } catch(err) {
        res.status(400).send("Failed registration");
    }
}

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    const user = await knex('users').where({username: username}).first();

    if (!user) {
		return res.status(400).send("Invalid Username")
	}

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if(!isPasswordCorrect) {
		return res.status(400).send("Invalid Password")
	}

    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_KEY,
        {expiresIn: '7d'}
    )
    res.json( {token: token} )
}

module.exports = {
    getUser,
    createUser,
    userLogin
}