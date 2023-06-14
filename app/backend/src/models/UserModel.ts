import IUser from '../Interfaces/Users/IUser';
import SequelizeUser from '../database/models/SequelizerUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const { id, username, password, role } = user;
    return { id, username, password, role, email };
  }
}
