const AuditLog =
  require('../../models/AuditLog');

class AuditService {

  // ==========================
  // CREATE AUDIT LOG
  // ==========================

  async log({

    action,

    userId = null,

    entity,

    entityId = null,

    metadata = {},

    req = null

  }) {

    try {

      await AuditLog.create({

        action,

        userId,

        entity,

        entityId,

        metadata,

        ipAddress:

          req?.ip || '',

        userAgent:

          req?.headers[
            'user-agent'
          ] || ''

      });

      console.log(

        `AUDIT: ${action}`

      );

    }

    catch (error) {

      console.log(error);

    }

  }

}

module.exports =
  new AuditService();