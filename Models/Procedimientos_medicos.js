const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class procedimientosMedicos extends Model {}
    procedimientosMedicos.init(
      {
        pro_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        cit_id: DataTypes.INTEGER,
        cpm_id: DataTypes.INTEGER,
        pro_valor: DataTypes.DECIMAL,
        pro_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_PROCEDIMIENTOS_MEDICOS',
        defaultScope: {
            where: {
                pro_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return procedimientosMedicos;
}