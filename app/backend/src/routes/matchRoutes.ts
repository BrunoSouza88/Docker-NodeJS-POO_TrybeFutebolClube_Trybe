import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenValidation from '../middleware/Validations/TokenValidation';

const matchesController = new MatchController();

const router = Router();

router.post('/', TokenValidation.validateToken, (req: Request, res: Response) =>
  matchesController.createMatch(req, res));

router.get('/', async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      await matchesController.getMatchProgress(req, res);
    } else if (inProgress === 'false') {
      await matchesController.getMatchProgress(req, res);
    } else {
      await matchesController.getAllMatches(req, res);
    }
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'Internal server error' });
  }
});

router.patch('/:id/finish', TokenValidation.validateToken, (req: Request, res: Response) =>
  matchesController.finishMatch(req, res));

router.patch('/:id', TokenValidation.validateToken, (req: Request, res: Response) =>
  matchesController.updateMatch(req, res));

router.get('/:id', (req: Request, res: Response) => matchesController.getMatchById(req, res));

export default router;
