import { Response, Request } from "express";
import { ChargesService } from "../services";

export class ChargesController {
  constructor(private chargesService: ChargesService) {}

  async post(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.chargesService.post(
        request.body.value,
        request.body.username
      );

      return response.send(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
