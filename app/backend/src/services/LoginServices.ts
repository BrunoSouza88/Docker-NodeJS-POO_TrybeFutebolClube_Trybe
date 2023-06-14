import * as bcrupt from 'bcryptjs';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import JWT from '../utils/JWT';
import ILogin from '../Interfaces/Users/ILogin';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import IToken from '../Interfaces/Token/IToken';
import IUser from '../Interfaces/Users/IUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwt = JWT,
  ) {}

  public async doLogin(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrupt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwt.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
  }
}
