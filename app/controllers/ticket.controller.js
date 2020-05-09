const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const Ticket = db.ticket;

exports.userTickets = (req, res) => {
  Ticket.findAll({
    where: {
      userId: req.userId
    }
  }).then( tickets => {
    res.status(200).send(JSON.stringify(tickets, null, 2));
  })
  .catch( error => {
    res.status(400).send
  });
}

exports.updateTicketRequestStatus = (req, res) => {
  Ticket.update({ ticket_pedido : req.body.data.ticket_pedido },{ where : { id : req.body.data.id, userId: req.userId }})
  .then( tickets => {
    res.status(200).send(JSON.stringify(tickets, null, 2));
  })
  .catch( error => {
    res.status(400).send
  });
}

exports.allTickets = (req, res) => {
  Ticket.findAll().then( tickets => {
    res.status(200).send(JSON.stringify(tickets, null, 2));
  })
  .catch( error => {
    res.status(400).send
  });
}

exports.createTicket = (req, res) => {
  let action ;

  if ( req.body.data.id !== null )
  {  
    Ticket.update(req.body.data).then( users => {
      res.status(200).send("Ticket updated successfully!");
    })
    .catch( error => {
      res.status(400).send
    });
  }
  else{
    Ticket.create(req.body.data).then( users => {
      res.status(200).send("Ticket created successfully!");
    })
    .catch( error => {
      res.status(400).send
    });
  }

};

exports.deleteTicket = (req, res) => {
  Ticket.destroy({
    where: {
      id: req.body.data.id
    }
  })
  .then(ticket => {
    res.send({ message: "Ticket removed successfully!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

