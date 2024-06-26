const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// models
const User = require("../models/user.model");
const Role = require("../models/role.model");

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password, ...rest } = body;
    // validar que el email no exista
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: `El correo ${email} ya existe` });
    }
    // encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);
    // buscar el rol customer
    const foundRole = await Role.findOne({ name: "customer" });
    if (!foundRole) {
      return res.status(400).json({ message: "El rol customer no existe" });
    }

    // guardar el usuario en la base de datos
    const newUser = new User({
      ...rest,
      email,
      password: hash,
      role: foundRole._id,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;
    // buscar el usuario en la base de datos
    const foundUser = await User.findOne({ email }).populate("role");
    if (!foundUser) {
      return res.status(401).json({ error: "Error al autenticarse" });
    }
    // comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Error al autenticarse" });
    }
    // generar token
    const role = foundUser.role.name;
    const user = { userId: foundUser._id, roles: [role] };
    // generar token
    const token = jwt.sign(user, config.secretKey, {
      expiresIn: config.jwtExpirationTime,
    });
    res.status(200).json({ token, user: foundUser });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    next(error);
  }
};

const whoAmI = async (req, res, next) => {
  try {
    const { userId } = req; // user authenticated
    const user = await User.findById(userId).populate("role");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, userLogin, userLogout, whoAmI };
