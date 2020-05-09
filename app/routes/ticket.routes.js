const { authJwt } = require("../middleware");
const controller = require("../controllers/ticket.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/userTickets",
    [authJwt.verifyToken],
    controller.userTickets
  );

  app.post(
    "/api/test/updateTicketRequestStatus",
    [authJwt.verifyToken],
    controller.updateTicketRequestStatus
  );

  app.get(
    "/api/test/allTickets",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allTickets
  );

  app.post(
    "/api/test/createTicket",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createTicket
  );

  app.post(
    "/api/test/deleteTicket",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteTicket
  );

};
