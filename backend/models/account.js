const options = { timestamps: false, freezeTableName: true };

export default (sequelize, DataTypes) =>
    sequelize.define('Account', {
        account_name: { type: DataTypes.STRING(50), primaryKey: true },
        account_password: { type: DataTypes.STRING(255), allowNull: false }
    }, { timestamps: false, tableName: 'Account' });
