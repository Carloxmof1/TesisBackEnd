
const Carrera = require('../controllers/carrera');
const Denuncia = require('../controllers/denuncia');
const Ramo = require('../controllers/ramo');
const Categoria = require('../controllers/categoria');
const Archivos = require('../controllers/archivos');
const Notas = require('../controllers/notas');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
var multer  = require('multer')
var upload = multer();


module.exports=(app) => {

  app.post('/notas', Notas.List);

  /*Rutas para obtener datos del usuario*/
  app.post('/login', authController.login);
  app.post('/register', authController.register);
  
  app.get('/GetData',authMiddleware.checkAuth,authController.GetData); 
  app.post('/ChangeColor',authMiddleware.checkAuth,authController.ChangeColor); 

  app.post('/Avatar',upload.single('file'),authMiddleware.checkAuth,authController.ChangeAvatar); 
  app.get('/Avatar',authMiddleware.checkAuth,authController.GetAvatar); 

  app.post('/changePreferencias',authMiddleware.checkAuth,authController.changePreferencias); 
  

  /*Rutas para obtener datos de carreras*/
  app.get('/carreras',authMiddleware.checkAuth,Carrera.List); 
  app.get('/ApiGetCarrera',authMiddleware.checkAuth,Carrera.ApiGetCarrera); 
  app.get('/carrerasramos',authMiddleware.checkAuth,Carrera.CarreraRamos); 
  
  /*Rutas para obtener datos de ramos*/
  app.get('/ramos',authMiddleware.checkAuth,Ramo.RamosbyCarrera); 

   /*Rutas para obtener datos de categorias*/
  app.get('/categorias',authMiddleware.checkAuth,Categoria.List); 
  
  /*Rutas para obtener las denuncias*/
  app.get('/denuncias',Denuncia.List); 
  app.get('/aceptarDenuncia',Denuncia.AceptarDenuncia); 
  app.get('/ignorarDenuncia',Denuncia.IgnorarDenuncia); 



  /*Rutas para obtener datos de Archivos*/
  app.post('/archivos',upload.any(),authMiddleware.checkAuth, Archivos.Subir);
  app.get('/archivos',authMiddleware.checkAuth, Archivos.GetAll);
  app.post('/GetArchivo',authMiddleware.checkAuth,Archivos.GetArchivo);
  app.post('/ValorarArchivo',authMiddleware.checkAuth, Archivos.ValorarArchivo);
  app.post('/DenunciarArchivo',authMiddleware.checkAuth, Archivos.DenunciarArchivo);
  app.post('/FilterArchivos',authMiddleware.checkAuth, Archivos.FilterArchivos);

};

