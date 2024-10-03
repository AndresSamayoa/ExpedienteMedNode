const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class especialidades extends Model {}
    especialidades.init(
      {
        ESP_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        MED_id: DataTypes.INTEGER,
        ESP_colegiado: DataTypes.INTEGER,
        ESP_especialidad: DataTypes.STRING,
        ESP_comentarios: DataTypes.STRING,
        ESP_fecha_eliminacion: DataTypes.DATE

    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_especialidaes',
        defaultScope: {
            where: {
                ESP_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return especialidades;
}