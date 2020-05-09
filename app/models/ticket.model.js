module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ticket_pedido: {
      type: Sequelize.BOOLEAN
    }
  });

  return Ticket;
};
