import { Body, Get, JsonController, Param, Post, QueryParam, QueryParams } from "routing-controllers";
import { UserService } from "../services/userService";
import Container from "typedi";

@JsonController('/user')
export class ProfileController {

    private userService = Container.get(UserService);

  @Get('/')
  async getUser(@QueryParams() params: any) {
    return await this.userService.getUsers(params);
  }

  @Post('/')
  async createUser(@Body({required:false}) request: any) {
    return await this.userService.createUser(request)
  }

  @Post('/update')
  async updateUsers(@Body({required:false}) request: any) {
    return await this.userService.updateUsers(request)
  }

  @Post('/delete')
  async deleteUser(@Body({required:false}) request: any) {
    return await this.userService.deleteUser(request)
  }
}