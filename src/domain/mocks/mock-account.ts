import { AuthenticationParams } from "../usercases/authentication";
import { faker } from "@faker-js/faker";
import { AccountModel } from "../models/account-model";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => (
  {
    accesstoken: faker.random.numeric()
  }
)