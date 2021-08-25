const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const warrantyHistorySchema = mongoose.Schema(
  {
    warrantyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Warranty',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    warrantyUsageDate: {
      type: String,
      required: true
    },
    deliveryDate: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['delivered', 'repairing', 'ready'],
      required: true 
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
warrantyHistorySchema.plugin(toJSON);
warrantyHistorySchema.plugin(paginate);

/**
 * @typedef WarrantyHistory
 */
const WarrantyHistory = mongoose.model('WarrantyHistory', warrantyHistorySchema);

module.exports = WarrantyHistory;
