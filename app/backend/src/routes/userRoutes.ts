import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidations from '../middleware/Validations/LoginValidations';
import TokenValidation from '../middleware/Validations/TokenValidation';

const loginController = new LoginController();

const router = Router();

router.post('/', LoginValidations.validateLogin, (req, res) => loginController.doLogin(req, res));
router.get('/role', TokenValidation.validateToken, (_req, res) => {
  const { role } = res.locals.user;
  res.status(200).json({ role });
});

export default router;
