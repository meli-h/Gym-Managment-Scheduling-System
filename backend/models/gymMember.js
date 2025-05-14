const options = { timestamps: false, freezeTableName: true };

export default (sequelize, DataTypes) =>
    sequelize.define('GymMember', {
        gymmember_id: { type: DataTypes.INTEGER, primaryKey: true }  // PK = FK
    }, { timestamps: false, tableName: 'GymMember' });
