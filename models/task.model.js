module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
      defaultValue: 'Todo',
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium',
    },
    due_date: {
      type: DataTypes.DATE,
    },
  });

  Task.associate = function (models) {
    Task.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    Task.belongsTo(models.User, {
      foreignKey: 'UserId', // First foreign key
      as: 'creator',        // Alias for the association
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  
    Task.belongsTo(models.User, {
      foreignKey: 'AssigneeId', // Second foreign key (ensure it's unique)
      as: 'assignee',           // Alias for the second association
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Task;
};
