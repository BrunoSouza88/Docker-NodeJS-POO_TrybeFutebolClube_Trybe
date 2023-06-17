import * as sinon from 'sinon';
import { expect } from 'chai';
import MatchService from '../services/MatchServices';
import MatchModel from '../models/MatchModel';
import { allMatches, matchesInProgress, matchesNotInProgress } from '../tests/mocks/matchesMock';

describe('GET POST PACTH /matches', () => {
  beforeEach(() => sinon.restore());

  describe('Deve retornar todas as partidas', () => {
    it('', async () => {
      const matchModel = new MatchModel();
      sinon.stub(matchModel, 'findAll').resolves(allMatches);

      const matchService = new MatchService(matchModel);
      const result = await matchService.getAll();

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.be.equal(allMatches);
    });

    it('Deve retornar as partidas em andamento"',  async () => {
      const matchModel = new MatchModel();
      sinon.stub(matchModel, 'finishMath').resolves(matchesInProgress as any);

      const matchService = new MatchService(matchModel);
      const result = await matchService.getMatchesByProgress(true);

      expect(result.status).to.be.equal('SUCCESSFUL');
      expect(result.data).to.be.eq(matchesInProgress)
    });

    it('Deve retornar as partidas que não estão em andamento',  async () => {
      const matchModel = new MatchModel();
      sinon.stub(matchModel, 'finishMath').resolves(matchesNotInProgress as any);

      const matchService = new MatchService(matchModel);
      const result = await matchService.getMatchesByProgress(false);

      expect(result.status).to.be.equal('SUCCESSFUL');
      expect(result.data).to.be.eq(matchesNotInProgress)
    });
  });
});
