const { config } = require("./../config/config");
const bcrypt = require("bcrypt");
//models
const User = require("../models/user.model");
const Role = require("../models/role.model");
const Category = require("../models/category.model");
const Status = require("../models/status.model");

// Crear datos por defecto dado un modelo
async function createDefaultData(Model, data) {
  try {
    const count = await Model.countDocuments();
    if (count === 0) {
      await Model.insertMany(data);
      console.log(`${Model.modelName} creados exitosamente`);
    }
  } catch (err) {
    console.error(`Error creando ${Model.modelName}`, err);
  }
}

// Inicializar datos por defecto
async function initializeDefaults() {
  await createDefaultData(Role, [
    { name: "customer" },
    { name: "agent" },
    { name: "admin" },
  ]);
  await createDefaultData(Category, [
    { name: "Problemas de Software" },
    { name: "Problemas de Hardware" },
    { name: "Problemas de Red" },
  ]);
  await createDefaultData(Status, [
    { name: "Abierto" },
    { name: "En proceso" },
    { name: "Resuelto" },
  ]);
}
// Crear usuario admin
async function createAdminUser() {
  try {
    const data = {
      firstName: config.adminFirstName,
      lastName: config.adminLastName,
      email: config.adminEmail,
      password: config.adminPassword,
    };
    const { email, password, ...rest } = data;
    // Verificar si el usuario ya existe
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      // Verificar si el rol admin existe
      const foundRole = await Role.findOne({ name: "admin" });
      if (!foundRole) {
        console.error("El rol admin no existe");
        return;
      }
      // Encriptar la contraseña
      const hash = await bcrypt.hash(password, 10);
      // Crear el usuario
      const newUser = new User({
        email,
        password: hash,
        roles: [foundRole._id],
        ...rest,
      });
      await newUser.save();
      console.log("Usuario admin creado exitosamente");
    }
  } catch (err) {
    console.error("Error creando usuario admin", err);
  }
}

module.exports = {
  initializeDefaults,
  createAdminUser,
};
