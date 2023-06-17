import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeams, oneTeam } from './mocks/teamsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
 
  beforeEach(() => sinon.restore());

  it('Deve retornar todas as equipes', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.eq(200);
    expect(body).to.be.equal(allTeams);
  });

  it('Deve retornar uma equipe específica', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(oneTeam as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.equal(oneTeam);
  });

  it('Deve retornar um erro ao buscar uma equipe inexistente', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/99');

    expect(status).to.be.equal(404);
    expect(body).to.be.equal('Team not found')
  });
});
