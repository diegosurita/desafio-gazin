import {DeveloperRepository} from "../../../repository/developer";
import {DeveloperService} from "../../../service/developer";

jest.mock('../../../repository/developer', () => {
    return {
        DeveloperRepository: jest.fn().mockImplementation(() => {
            return {fetchAll: () => Promise.resolve([{name: 'Diego Estevan Surita'}])};
        })
    };
});

let developerRepository: any,
    developerService: any;

const init = () => {
    developerRepository = new DeveloperRepository();
    developerService = new DeveloperService();
}

describe('DeveloperService', () => {

    beforeAll(() => init());

    it('obtem todos os desenvolvedores cadastrados', async () => {

        const developers = await developerService.fetchAll(1, 25);

        expect(developers.length).toBeGreaterThan(0);
        expect(developers[0].name).toEqual('Diego Estevan Surita');
    });

});
