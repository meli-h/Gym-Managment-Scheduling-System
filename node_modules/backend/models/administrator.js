const options = { timestamps: false, freezeTableName: true };

export default (sequelize, DataTypes) =>
    sequelize.define('Administrator', {
        administrator_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        person_id: { type: DataTypes.INTEGER, unique: true }   // 1‑1
    }, { timestamps: false, tableName: 'Administrator' });
