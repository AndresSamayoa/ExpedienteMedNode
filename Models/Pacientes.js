const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class pacientes extends Model {}
    pacientes.init(
      {
        pac_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        pac_nombre: DataTypes.STRING,
        pac_apellido: DataTypes.STRING,
        pac_cui: DataTypes.STRING,
        pac_fecha_nacimiento: DataTypes.DATE,
        pac_numero_telefonico: DataTypes.INTEGER,
        pac_correo_electronico: DataTypes.STRING,
        pac_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_Pacientes',
        defaultScope: {
            where: {
                pac_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return pacientes;
}