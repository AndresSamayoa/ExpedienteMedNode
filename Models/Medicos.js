const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class medicos extends Model {}
    medicos.init(
      {
        med_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        usr_id: DataTypes.INTEGER,
        med_nombre: DataTypes.STRING,
        med_apellido: DataTypes.STRING,
        med_tipo: DataTypes.STRING,
        med_telefono: DataTypes.INTEGER,
        med_correo: DataTypes.STRING,
        med_numero_colegiado: DataTypes.STRING,
        med_fecha_eliminacion: DataTypes.DATE,
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_MEDICOS',
        defaultScope: {
            where: {
                med_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return medicos;
}