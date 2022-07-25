import { AuthenticationParams } from "../../../domain/usercases/authentication";
import { HttpPostClient } from "../../protocols/http/httpPostClient";

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