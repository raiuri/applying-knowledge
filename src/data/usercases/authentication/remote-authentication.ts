import { AuthenticationParams } from "../../../domain/usercases/authentication";
import { HttpPostClient } from "../../../data/protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credential-error";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AccountModel } from "../../../domain/models/account-model";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch(httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}