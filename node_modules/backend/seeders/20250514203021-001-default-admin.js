//npx sequelize-cli db:seed:all          # development veritabanına işler terminal komutu

//import { Account } from './models/index.js'; ----------------> kontrol icin
//import { seedAdmin } from './seeders/seedAdminRuntime.js'; // isteğe bağlı

//if (!(await Account.findByPk('admin1'))) {
//await seedAdmin();   // tek fonksiyonluk runtime seeder
//}




'use strict';
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface, Sequelize }) {
  // BEGIN TRANSACTION
  const transaction = await queryInterface.sequelize.transaction();
  try {
    /* 1) Account */
    await queryInterface.bulkInsert(
      'Account',
      [
        {
          account_name: 'admin1',
          account_password: await bcrypt.hash('admin123', 10), // ilk parola
        },
      ],
      { transaction }
    );

    /* 2) Person */
    // MySQL: last insert ID okuma
    const [result] = await queryInterface.sequelize.query(
      `SELECT person_id FROM Person WHERE account_name = 'admin1'`,
      { transaction }
    );

    let personId;
    if (result.length === 0) {
      // Person yoksa ekle
      const [insertRes] = await queryInterface.bulkInsert(
        'Person',
        [
          {
            name: 'System',
            surname: 'Administrator',
            contactNumber: '0000000000',
            dateOfBirth: '1990-01-01',
            gender: 'Other',
            account_name: 'admin1',
          },
        ],
        { transaction, returning: ['person_id'] }
      );
      personId = insertRes; // MySQL < 8 returning desteklemezse alternate okuma yapın
    } else {
      personId = result[0].person_id;
    }

    /* 3) Administrator */
    await queryInterface.bulkInsert(
      'Administrator',
      [{ person_id: personId }],
      { transaction }
    );

    await transaction.commit();
    console.log('✅  Default admin seeded');
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('Administrator', {}, {});
  await queryInterface.bulkDelete('Person', { account_name: 'admin1' }, {});
  await queryInterface.bulkDelete('Account', { account_name: 'admin1' }, {});
}
