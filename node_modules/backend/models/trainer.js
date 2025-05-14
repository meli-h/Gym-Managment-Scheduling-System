const options = { timestamps: false, freezeTableName: true };

export default (sequelize, DataTypes) =>
    sequelize.define('Trainer', {
        trainer_id: { type: DataTypes.INTEGER, primaryKey: true },
        areaOfExpertise: { type: DataTypes.STRING(100), allowNull: false }
    }, { timestamps: false, tableName: 'Trainer' });
