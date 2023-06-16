import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchesController = new MatchController();

const router = Router();

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

// router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.get('/:id', (req: Request, res: Response) => matchesController.getMatchById(req, res));

export default router;
