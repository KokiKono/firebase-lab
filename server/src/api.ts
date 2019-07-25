import { Router } from 'express';
import models from './models';

const api = Router();

// TODO: Petsエンドポイントとページング、ページング機能
api.get('/v1/pets/', async (req, res) => {
    const result = await models.PetModel.getAllPets();
    res.json(result);
});

export default api;
