const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class citas extends Model {}
    citas.init(
      {
        cit_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        med_id: DataTypes.INTEGER,
        pac_id: DataTypes.INTEGER,
        cit_fecha: DataTypes.DATE,
        cit_estado: DataTypes.ENUM('Programada', 'Atendida', 'Completada', 'Cancelada'),
        cit_costo_total: DataTypes.DECIMAL,
        cit_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_Citas',
        defaultScope: {
            where: {
                cit_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return citas;
}