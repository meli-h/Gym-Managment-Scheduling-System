import { sequelize } from '../config/db.js';
import { Trainer } from '../models/index.js';
import { createAccountWithPerson } from './userService.js';

export const createTrainer = async (data) => {
    const t = await sequelize.transaction();
    try {
        const person = await createAccountWithPerson(data, t);

        await Trainer.create(
            { trainer_id: person.person_id, areaOfExpertise: data.areaOfExpertise },
            { transaction: t }
        );

        await t.commit();
        return person.person_id;
    } catch (err) {
        await t.rollback();
        throw err;
    }
};
