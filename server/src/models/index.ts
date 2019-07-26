import * as PetModel from './pet';

const {NODE_ENV} = process.env;
if (NODE_ENV == 'mock') {
    require('./__mocks__');
}

export default {
    PetModel,
};
