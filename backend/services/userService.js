import { sequelize } from '../config/db.js';
import { Account, Person } from '../models/index.js';
import { hashPassword } from '../utils/hash.js';

export const createAccountWithPerson = async (payload) => {
    const t = await sequelize.transaction();
    try {
        const { username, password, ...personData } = payload;

        const hashed = await hashPassword(password);
        await Account.create(
            { account_name: username, account_password: hashed },
            { transaction: t }
        );

        const person = await Person.create(
            { ...personData, account_name: username },
            { transaction: t }
        );

        await t.commit();
        return person;                 // geri kalan service’ler kullanabilir
    } catch (err) {
        await t.rollback();
        throw err;
    }
};
