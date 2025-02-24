const { DataTypes, Model } = require('sequelize');

class Inventory extends Model {
    static init(sequelize) {
        return super.init({
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, { sequelize, modelName: 'Inventory' });
    }

    static associate(models) {
        this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
}

module.exports = Inventory;
