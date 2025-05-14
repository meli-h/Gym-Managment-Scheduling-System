const options = { timestamps: false, freezeTableName: true };


export default (sequelize, DataTypes) =>
    sequelize.define('Reservation', {
        reservation_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        reservation_start: { type: DataTypes.DATE, allowNull: false },
        duration_minutes: { type: DataTypes.SMALLINT, allowNull: false },
        class_capacity: { type: DataTypes.SMALLINT, allowNull: false },
        gymmember_id: { type: DataTypes.INTEGER, allowNull: false },
        trainer_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: false, tableName: 'Reservation' });
