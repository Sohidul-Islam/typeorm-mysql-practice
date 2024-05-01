import { Service } from "typedi";
import { ILike, Repository } from "typeorm";
// import { InjectRepository } from "typeorm-typedi-extensions";
import User from "../entities/User";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createUser(request: any) {
    const user = await this.userRepo.create(request);
    const newUser = this.userRepo.save(request);

    return {
      succss: "success",
      data: "create user",
      entry: newUser,
    };
  }

  async getUsers(params: any) {
    // Extract any criteria from the request object to filter the user records
    const { name, id } = params;

    // Define selection conditions based on the extracted criteria
    const conditions: any = {};
    if (name) {
      conditions.name = name;
    }

    if (id) {
      conditions.id = id;
    }

    // const user = await this.userRepo.findOneBy(conditions)

    const users = await this.userRepo.findBy(conditions);

    if (users?.length) {
      return {
        success: "success",
        message: "user found",
        data: users,
      };
    }

    return {
      succss: "failed",
      message: "User Not found",
    };
  }

  async getUsersByFilter(params: any) {
    const { name, id, page = 1, pageSize = 10, searchKey } = params;

    // Define selection conditions based on the extracted criteria
    const conditions: any = {};
    if (name) {
      conditions.name = name;
    }

    if (id) {
      conditions.id = id;
    }

    if (searchKey) {
      conditions.or = [
        { name: ILike(`%${searchKey}%`) },
        { email: ILike(`%${searchKey}%`) },
      ];
    }

    // if (searchKey) {
    //   conditions.name = ILike(`%${searchKey}%`);
    // }

    // if (searchKey) {
    //   conditions.email = ILike(`%${searchKey}%`);
    // }

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Find users based on conditions with pagination
    const [users, totalUsers] = await this.userRepo.findAndCount({
      where: [
        { name: ILike(`%${searchKey}%`) },
        { email: ILike(`%${searchKey}%`) },
      ],
      // where: conditions,
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalUsers / pageSize);

    if (users?.length) {
      return {
        success: "success",
        message: "user found",
        data: users,
        metaData: {
          page,
          pageSize,
          totalPages,
          totalData: totalUsers,
        },
      };
    }

    return {
      succss: "failed",
      message: "User Not found",
      data: [],
    };
  }

  async getUsersByFilters(params: any) {
    const { name, id, page = 1, pageSize = 10, searchKey } = params;

    // Define selection conditions based on the extracted criteria
    const conditions: any = {};
    if (name) {
      conditions.name = name;
    }

    if (id) {
      conditions.id = id;
    }

    if (searchKey) {
      conditions.or = [
        { name: ILike(`%${searchKey}%`) },
        { email: ILike(`%${searchKey}%`) },
      ];
    }

    // if (searchKey) {
    //   conditions.name = ILike(`%${searchKey}%`);
    // }

    // if (searchKey) {
    //   conditions.email = ILike(`%${searchKey}%`);
    // }

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Find users based on conditions with pagination
    const [users, totalUsers] = await this.userRepo.findAndCount({
      where: [
        { name: ILike(`%${searchKey}%`) },
        { email: ILike(`%${searchKey}%`) },
      ],
      // where: conditions,
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalUsers / pageSize);

    if (users?.length) {
      return {
        success: "success",
        message: "user found",
        data: users,
        metaData: {
          page,
          pageSize,
          totalPages,
          totalData: totalUsers,
        },
      };
    }

    return {
      succss: "failed",
      message: "User Not found",
      data: [],
    };
  }

  async getUsersByFilters2(params: any) {
    const { name, id, page = 1, pageSize = 10, searchKey } = params;

    // Define selection conditions based on the extracted criteria
    const conditions: any = [];
    if (name) {
      conditions.push({ name });
    }

    if (id) {
      conditions.push({ id });
    }

    if (searchKey) {
      conditions.push([
        { name: ILike(`%${searchKey}%`) },
        { email: ILike(`%${searchKey}%`) },
      ]);
    }

    // if (searchKey) {
    //   conditions.name = ILike(`%${searchKey}%`);
    // }

    // if (searchKey) {
    //   conditions.email = ILike(`%${searchKey}%`);
    // }

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Find users based on conditions with pagination
    const [users, totalUsers] = await this.userRepo.findAndCount({
      where: conditions,
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalUsers / pageSize);

    if (users?.length) {
      return {
        success: "success",
        message: "user found",
        data: users,
        metaData: {
          page,
          pageSize,
          totalPages,
          totalData: totalUsers,
        },
      };
    }

    return {
      succss: "failed",
      message: "User Not found",
      data: [],
    };
  }

  async updateUsers(data: any) {
    const { id } = data;

    const user = await this.userRepo.findOneById(id);

    if (user) {
      const update = await this.userRepo.update({ id }, data);

      return {
        success: "success",
        message: "Successfully Updated",
        data: data,
      };
    }

    return {
      succss: "failed",
      message: "User Not found",
    };
  }

  async deleteUser(data: any) {
    const { id } = data;

    const user = await this.userRepo.findOneById(id);

    if (user) {
      const deletedData = await this.userRepo.delete(id);

      return {
        success: "success",
        message: "Successfully Deleted",
        data: user,
        deletedData,
      };
    }

    return {
      succss: "failed",
      message: "User Not found",
    };
  }
}
