const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class examenes extends Model {}
    examenes.init(
      {
        exa_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        pac_id: DataTypes.INTEGER,
        exa_comentario: DataTypes.STRING,
        exa_fecha: DataTypes.DATE,
        exa_resultado: DataTypes.STRING,
        exa_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_Examenes',
        defaultScope: {
            where: {
                exa_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return examenes;
}