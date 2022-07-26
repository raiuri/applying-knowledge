import { AuthenticationParams } from "../../../domain/usercases/authentication";
import { HttpPostClient } from "../../../data/protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credential-error";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch(httpResponse.statusCode) {
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: return Promise.resolve()
    }
  }
}