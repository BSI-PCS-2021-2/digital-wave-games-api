import { Response, Request } from "express";
import { GoogleAuthenticationService } from "../services";

export class GoogleAuthenticationController {
  constructor(
    private googleAuthenticationService: GoogleAuthenticationService
  ) {}

  async post(request: Request, response: Response): Promise<Response> {
    const { email, id, name } = request.body;
    try {
      const result = await this.googleAuthenticationService.post({
        email: email,
        id: id,
        name: name,
      });

      return response.send(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
