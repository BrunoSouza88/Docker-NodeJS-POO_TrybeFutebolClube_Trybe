import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidations from '../middleware/Validations/LoginValidations';

const loginController = new LoginController();

const router = Router();

router.post('/', LoginValidations.validateLogin, (req, res) => loginController.doLogin(req, res));

export default router;
