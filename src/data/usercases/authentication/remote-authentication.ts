import { AuthenticationParams } from "src/domain/usercases/authentication";
import { HttpPostClient } from "src/data/protocols/http/httpPostClient";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    this.httpClient.post({
      url: this.url,
      body: params
    })
  }
}