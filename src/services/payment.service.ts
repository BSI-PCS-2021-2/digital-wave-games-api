import logger from '../utils/logger';

export class PaymentService {

    constructor() { }

    async makeBankSlipPayment(): Promise<void> {
        logger.info('Making bank payment slip...')
        // Precisamos criar um boleto falso aqui e retornar-lo para o front-end.
    }

    async makeCardPayment(): Promise<void> {
        logger.info('Processing fake card payment...');
        // Aqui podemos só fazer uma validação qualquer dos dados do cartão.
    }
}