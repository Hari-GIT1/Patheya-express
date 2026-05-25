const ApiError =
  require(
    '../errors/ApiError'
  );

module.exports =
(...allowedRoles) => {

  return (

    req,

    res,

    next

  ) => {

    try {

      const role =

        req.user?.role ||

        req.admin?.role ||

        req.auth?.role;

      // ======================
      // NO ROLE
      // ======================

      if (!role) {

        return next(

          new ApiError(

            401,

            'Unauthorized'

          )

        );

      }

      // ======================
      // ACCESS DENIED
      // ======================

      if (

        !allowedRoles.includes(
          role
        )

      ) {

        return next(

          new ApiError(

            403,

            'Access denied'

          )

        );

      }

      next();

    }

    catch (error) {

      next(error);

    }

  };

};