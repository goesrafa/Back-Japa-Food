import { Router } from 'express'
import multer from 'multer';

//Importações criadas
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';


import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'

import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'

import { RemoveItemController } from './controllers/order/RemoveItemController'
import { AddItemController } from './controllers/order/AddItemController';

import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import {FinshOrderController} from './controllers/order/FinshOrderController'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USERS--*/
//users
router.post('/users', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.get('/info', isAuthenticated, new DetailUserController().handle)

//--ROTAS CATEGORY*/
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category ', isAuthenticated, new ListCategoryController().handle)

//--ROTAS PRODUCT*/ 
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//-ROTAS ORDER*/
router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinshOrderController().handle)



export { router };