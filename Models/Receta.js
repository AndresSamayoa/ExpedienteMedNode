const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class receta extends Model {}
    receta.init(
      {
        REC_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        DIA_id: DataTypes.INTEGER,
        REC_valor_total: DataTypes.INTEGER,
        REC_fecha_eliminacion: DataTypes.DATE

    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_Receta',
        defaultScope: {
            where: {
                REC_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return receta;
}