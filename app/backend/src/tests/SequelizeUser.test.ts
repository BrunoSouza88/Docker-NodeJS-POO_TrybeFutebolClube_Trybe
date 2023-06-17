import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizerUser';
import usersMock from './mocks/usersMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  beforeEach(() => sinon.restore());

  it('Deve autenticar um usuário válido', async () => {
    const user = SequelizeUser.build(usersMock.user);

    sinon.stub(SequelizeUser, 'findOne').resolves(user);

    const response = await chai.request(app).post('/login').send(usersMock.login);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(usersMock.login);
  });

  it('Deve retornar um erro ao autenticar um usuário inválido', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(usersMock.invalidLogin);

    expect(response.status).to.be.equal(401);
  });

  it('Deve retornar o papel do usuário autenticado', async () => {
    const user = SequelizeUser.build(usersMock.user);

    sinon.stub(SequelizeUser, 'findOne').resolves(user);

    const loginResponse = await chai.request(app).post('/login').send(usersMock.login);

    const { token } = loginResponse.body;

    const response = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    expect(response.body.role).to.exist;
  });

  it('Deve retornar um erro ao buscar o papel sem autenticação', async () => {
    const response = await chai.request(app).get('/login/role');

    expect(response.status).to.be.equal(401);
    expect(response.body.role).to.not.exist;
  });
});