const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const db = new Sequelize(process.env.DATABASE_URL, {
  // database: 'firesale_db',
  dialect: 'postgres'
})

//user model
const User = db.define('user',{
  name: Sequelize.STRING,
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
  },
  password:{
      type: Sequelize.STRING,
      allowNull: false
  }

})

//products model
const Product = db.define("products",{
  category: Sequelize.STRING,
  name: Sequelize.STRING,
  stock: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  image: Sequelize.TEXT,
  description: Sequelize.TEXT
})

//comments model
const Comment = db.define("comments",{
  description: Sequelize.TEXT
})

//checkout model
const Checkout = db.define("checkout",{
  saleId: Sequelize.INTEGER,
  date: Sequelize.DATE,
  total:Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
})

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(process.env.SALT_ROUNDS)
  )
  user.password = hashedPassword
})

Product.hasMany(Comment)
Comment.belongsTo(Product)

User.hasMany(Comment)
Comment.belongsTo(User)


module.exports = {
  db,
  User,
  Product,
  Comment,
  Checkout
}

