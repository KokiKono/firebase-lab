import * as sinon from 'sinon';
import * as uuid from 'uuid';

import * as petModel from '../pet';

const getAllPets = sinon.stub(petModel, 'getAllPets');
const stubAllPets = async (): Promise<petModel.Pet[]> => {
    const result: petModel.Pet[] = [];
    for(let counter=0; counter < 100; counter+=1) {
        const id = uuid.v4();
        result.push({
            id,
            name: `pet_name_${id}`,
            birth_day: new Date(),
        });
    }
    return result;
}
getAllPets.returns(stubAllPets());
