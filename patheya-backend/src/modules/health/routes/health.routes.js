const express =
  require('express');

const router =
  express.Router();

const healthService =
  require(
    '../../../core/monitoring/health.service'
  );

// ==============================
// BASIC HEALTH
// ==============================

router.get(

  '/',

  (req, res) => {

    const health =
      healthService
        .getBasicHealth();

    return res.status(200)
      .json(health);

  }

);

// ==============================
// DETAILED HEALTH
// ==============================

router.get(

  '/details',

  async (req, res) => {

    const details =
      await healthService
        .getDetailedHealth();

    return res.status(200)
      .json(details);

  }

);

module.exports =
  router;