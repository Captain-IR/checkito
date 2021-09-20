module.exports = async () => {
	const Todo = require('./models/Todo')
	const User = require('./models/User')

	User.hasMany(Todo, { as: 'Todos', foreignKey: 'userId' })
	Todo.belongsTo(User, { as: 'User', foreignKey: 'userId' })

	try {
		const user = await User.create({
			username: 'test',
			password: 'test',
		})
		const todo = await Todo.create({
			title: 'test title',
			dueDate: '2020/10/12',
			dueTime: '18:30',
			userId: user.id,
		})

		const testUser = await User.findAll({
			where: { username: 'test' },
			include: [{ model: Todo, as: 'Todos' }],
		})

		console.log('Test user Todos', testUser)
	} catch (err) {
		console.log(err)
	}
}
