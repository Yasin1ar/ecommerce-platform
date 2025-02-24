const Inventory = require('../models/Inventory');

exports.updateInventory = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        let inventory = await Inventory.findOne({ where: { productId } });

        if (inventory) {
            inventory.quantity = quantity;
            await inventory.save();
        } else {
            inventory = await Inventory.create({ productId, quantity });
        }

        res.status(200).json({ success: true, data: inventory });
    } catch (error) {
        next(error);
    }
};

exports.getInventory = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const inventory = await Inventory.findOne({ where: { productId } });

        if (!inventory) {
            return res.status(404).json({ success: false, message: 'Inventory not found' });
        }

        res.status(200).json({ success: true, data: inventory });
    } catch (error) {
        next(error);
    }
};
