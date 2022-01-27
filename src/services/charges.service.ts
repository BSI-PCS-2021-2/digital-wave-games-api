import { User } from "../models";
import { IUsersRepository } from "../interfaces";
import logger from "../utils/logger";
import { CLIENT_ID } from "../utils/secrets";
import { CLIENT_SECRET } from "../utils/secrets";

var Gerencianet = require("gn-api-sdk-node");

export class ChargesService {
  constructor(private usersRepository: IUsersRepository) {}

  async post(value: number, username: string): Promise<boolean | null> {
    let response = true;

    try {
      const user: User | null = await this.usersRepository.getUser(username);

      if (user === null || user === undefined) {
        return null;
      }

      let gerencianet = new Gerencianet({
        sandbox: true,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        pix_cert: "",
      });

      var chargeInput = {
        items: [
          {
            name: "Compra DigitalWaveGames",
            value: value,
            amount: 1,
          },
        ],
        payment: {
          banking_billet: {
            customer: {
              name: user.name,
              cpf: "19336406000",
              email: user.email,
              birth: "1970-01-01",
              phone_number: "1199999999",
            },
            expire_at: "2022-02-03",
          },
        },
      };

      gerencianet
        .oneStep({}, chargeInput)
        .then((resposta: any) => {
          console.log(resposta);
        })
        .catch((error: any) => {
          console.log(error);
        })
        .done();
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }

    return response;
  }
}
