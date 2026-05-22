const mongoose =
  require('mongoose');

// ==============================
// AUDIT LOG SCHEMA
// ==============================

const auditLogSchema =
  new mongoose.Schema({

    // ==========================
    // ACTION
    // ==========================

    action: {

      type: String,

      required: true,

      index: true

    },

    // ==========================
    // USER
    // ==========================

    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'User',

      default: null,

      index: true

    },

    // ==========================
    // ENTITY
    // ==========================

    entity: {

      type: String,

      required: true,

      index: true

    },

    entityId: {

      type:
        mongoose.Schema.Types.ObjectId,

      default: null,

      index: true

    },

    // ==========================
    // METADATA
    // ==========================

    metadata: {

      type: Object,

      default: {}

    },

    // ==========================
    // IP ADDRESS
    // ==========================

    ipAddress: {

      type: String,

      default: ''

    },

    // ==========================
    // USER AGENT
    // ==========================

    userAgent: {

      type: String,

      default: ''

    }

  }, {

    timestamps: true

  });

// ==============================
// INDEXES
// ==============================

auditLogSchema.index({

  createdAt: -1

});

module.exports =
  mongoose.model(

    'AuditLog',

    auditLogSchema

  );