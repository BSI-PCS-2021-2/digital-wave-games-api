import logger from '../utils/logger';

export class FreightService {

    constructor() { }

    async calculateFreight(weight: number): Promise<number> {

        // Alguma fórmula para calcular o frete
        logger.info('Calculating freight...')
        return 10000;
    }
}