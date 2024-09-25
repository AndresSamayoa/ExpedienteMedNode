const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class Signosvitales extends Model {}
    Signosvitales.init(
      {
        SIG_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        PAC_id: DataTypes.INTEGER,
        SIG_presion_arterial: DataTypes.STRING,
        SIG_temperatura:DataTypes.STRING,
        SIG_frecuencia_cardiaca :DataTypes.STRING,
        SIG_respiraciones:DataTypes.STRING,
        SIG_oxigenacion :DataTypes.STRING,
        SIG_glucosa : DataTypes.STRING,
        SIG_peso: DataTypes.STRING,
        SIG_estatura : DataTypes.STRING,
        SIG_fecha_eliminacion: DataTypes.DATE

    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_SIGNOS_VITALES',
        defaultScope: {
            where: {
              SIG_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return Signosvitales;
}