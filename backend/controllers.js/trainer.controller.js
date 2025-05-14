import { Trainer, Person } from '../models/index.js';
import { createTrainer as svcCreate } from '../services/trainerService.js';

export const createTrainer = async (req, res, next) => {
    try {
        const id = await svcCreate(req.body);
        res.status(201).json({ trainer_id: id });
    } catch (err) { next(err); }
};

export const listTrainers = async (req, res, next) => {
    try {
        const all = await Trainer.findAll({ include: ['person'] });
        res.json(all);
    } catch (err) { next(err); }
};

export const updateTrainer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { areaOfExpertise, name, surname } = req.body;

        await Trainer.update({ areaOfExpertise }, { where: { trainer_id: id } });
        await Person.update({ name, surname }, { where: { person_id: id } });

        res.json({ message: 'updated' });
    } catch (err) { next(err); }
};

export const deleteTrainer = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Trainer.destroy({ where: { trainer_id: id } });   // FK cascade’den dolayı Person kalırsa önce admin/member ilişkisine bakın
        await Person.destroy({ where: { person_id: id } });
        res.json({ message: 'deleted' });
    } catch (err) { next(err); }
};
