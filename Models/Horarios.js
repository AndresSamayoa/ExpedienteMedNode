const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class horarios extends Model {}
    horarios.init(
      {
        hor_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        med_id: DataTypes.INTEGER,
        hor_inicio: DataTypes.DATE,
        hor_fin: DataTypes.DATE,
        hor_hora_inicio: DataTypes.INTEGER,
        hor_hora_fin: DataTypes.INTEGER,
        hor_disponibilidad: DataTypes.TINYINT,
        hor_lunes: DataTypes.TINYINT,
        hor_martes: DataTypes.TINYINT,
        hor_miercoles: DataTypes.TINYINT,
        hor_jueves: DataTypes.TINYINT,
        hor_viernes: DataTypes.TINYINT,
        hor_sabado: DataTypes.TINYINT,
        hor_domingo: DataTypes.TINYINT,
        hor_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_Horario',
        defaultScope: {
            where: {
                HOR_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return horarios;
}