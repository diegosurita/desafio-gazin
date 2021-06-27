import developerRepository from '../../../repository/developer';

describe('DeveloperRepository', () => {

    it('obtem todos os developers', async () => {
        const developers = await developerRepository.fetchAll(1, 25, '');

        console.log(developers);

        expect(developers.data).toHaveLength(1);
    });

});
