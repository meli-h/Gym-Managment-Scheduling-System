const options = { timestamps: false, freezeTableName: true };


export default (sequelize, DataTypes) =>
    sequelize.define('Person', {
        person_id: { type: DataTypes.INTEGER, primaryKey: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        surname: { type: DataTypes.STRING(50), allowNull: false },
        contactNumber: { type: DataTypes.STRING(20), allowNull: false },
        dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
        gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: false },
        account_name: { type: DataTypes.STRING(50), allowNull: false }
    }, { timestamps: false, tableName: 'Person' });
