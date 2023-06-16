import { Request, Response } from 'express';
import UserService from '../services/LoginServices';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async doLogin(req: Request, res: Response) {
    const ServiceResponse = await this.userService.doLogin(req.body);

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
