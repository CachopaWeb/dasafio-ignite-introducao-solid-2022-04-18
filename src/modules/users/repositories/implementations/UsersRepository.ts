import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    let user = new User();
    user.name = name;
    user.email = email;
    user.created_at = new Date();
    user.updated_at = new Date();
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true;
    receivedUser.updated_at = new Date();
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
