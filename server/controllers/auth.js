const config =  require('../services/config');
const bcrypt = require('bcrypt');
const authService = require('../services/auth');
const Usuarios = require('../models').Usuario;
const resp = require('./response');
const Op = require('sequelize').Op;

const addUser = user => Usuarios.create(user);



function login(req, res){
	return authService.authenticate(req.body)
	.then(data => {
		return	resp.Success(res,"Ha iniciado session correctamente",data)
	})
	.catch(err => {
		if (err.type === 'custom'){
			return resp.Error(res,err.message)
		}
		return resp.Error(res,'Error al iniciar sesión. Error desconocido.')
	})
};



function register(req, res){

	const { nombre, correo, rut,password,cod_carrera} = req.body

	return Usuarios.findOne({  where: {
		[Op.or]: [{correo: correo}, {rut: rut}]
	  }})
	
	.then(exists => {
		if (exists){
			return resp.Error(res,'Registro fallido. El correo/rut ingresado ya existe.')
		}
		var user = {
			nombre,
            correo,
            rut,
            password: bcrypt.hashSync(password, config.saltRounds),
            cod_carrera
		}

		return addUser(user)
		.then(() => resp.Success(res,"Se ha registrado correctamente."))
		.catch(() => resp.Error(res,"No se ha podido completar el resgistro. Revise los campos"));

	})
	.catch((e) =>console.log(e));
	
};


module.exports = {
	login,
	register
}
