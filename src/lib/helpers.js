const bcrypt = require("bcryptjs");

const helpers = {};

// los metodos que declaremos de "helpers" son creados por nosotros por ende le ponemos el nombre que querramos
helpers.encryptPassword = async (password) =>{ //recivimos la contraseña en texto plano
    const salt = await bcrypt.genSalt(10); //generamos un cifrado, patrón o hash, pero toma tiempo por eso await
    const hash = await bcrypt.hash(password, salt); //encriptamos las contraseñas, tambien toma tiempo por eso asincrono 
    return hash;
};

helpers.matchPassword = async (password, savedPassword)=> {
    try{
        return await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e);
    }
}

module.exports = helpers;