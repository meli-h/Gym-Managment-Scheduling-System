const options = { timestamps: false, freezeTableName: true };

export default (sequelize, DataTypes) =>
    sequelize.define('Membership', {
        membership_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        gymmember_id: { type: DataTypes.INTEGER, allowNull: false },
        membership_type: { type: DataTypes.ENUM('Monthly', 'Quarterly', 'Annual'), allowNull: false },
        member_start_date: { type: DataTypes.DATEONLY, allowNull: false },
        member_end_date: { type: DataTypes.DATEONLY }         // NULL = devam ediyor
    }, { timestamps: false, tableName: 'Membership' });
