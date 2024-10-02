const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class diagnosticos extends Model {}
    diagnosticos.init(
      {
        dia_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        cit_id: DataTypes.INTEGER,
        enf_id: DataTypes.INTEGER,
        dia_observacion: DataTypes.STRING,
        dia_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_DIAGNOSTICO',
        defaultScope: {
            where: {
                dia_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return diagnosticos;
}