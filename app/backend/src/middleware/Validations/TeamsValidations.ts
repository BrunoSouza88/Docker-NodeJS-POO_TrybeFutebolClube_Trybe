import { NextFunction, Request, Response } from 'express';
import SequelizeMatch from '../../database/models/SequelizeMatch';

export default class TeamsValidations {
  static async validateTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    const allTeams = await SequelizeMatch.findAll();
    const teamIds = allTeams.map((team) => team.dataValues.id);
    const insertionIds = [homeTeamId, awayTeamId];
    const areAllIdsValid = insertionIds.every((id) => teamIds.includes(Number(id)));

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!areAllIdsValid) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
