import { Response, Request } from "express";
import { GetUsersUseCase } from "./getUsersUseCase";

export class GetUsersController {

    constructor(private getUsersUseCase: GetUsersUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {

        // let params: any = request.query;

        try {

            const result = await this.getUsersUseCase.execute(null);

            return response.send(result);
            
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}