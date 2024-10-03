const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class detallereceta extends Model {}
    detallereceta.init(
      {
        det_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        med_id: DataTypes.INTEGER,
        rec_id: DataTypes.INTEGER,
        det_comentarios: DataTypes.STRING,
        det_cantidad: DataTypes.INTEGER,
        det_subtotal: DataTypes.INTEGER,
        det_fecha_eliminacion: DataTypes.DATE,

    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_detalle_receta',
        defaultScope: {
            where: {
                DET_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return detallereceta;
}