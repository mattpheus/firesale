const { User, Comment, Product, Checkout } = require('../database/models')
const bcrypt = require('bcrypt')

const seedDb = async () => {
  try {
    await User.destroy({
      where: {}
    })
    await Comment.destroy({
      where: {}
    })

    const user1 = await User.create({
      name: 'Matt Seecharan',
      email: 'matt@gmail.com',
      password: 'pass123'
    })

    const user2 = await User.create({
      name: 'Test Name',
      email: 'test@gmail.com',
      password: 'pass1234'
    })

    const user3 = await User.create({
      name: 'Lori Hines',
      email: 'lori@gmail.com',
      password: '12345pass'
    })

    const user4 = await User.create({
      name: 'Bob Johnson',
      email: 'bob@gmail.com',
      password: '123'
    })

    const electricProd1 = await Product.create({
      category: "Electronics",
      name: "Smart Phone",
      stock: 10,
      price: 499,
      image: "https://images.unsplash.com/photo-1553914204-a8fcee407d7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      description: "This is a one of a kind smartphone by Appiod"

    })

    const electricProd2 = await Product.create({
      category: "Electronics",
      name: "Blue Tooth Speaker",
      stock: 20,
      price: 99,
      image: "https://images.unsplash.com/photo-1547052178-7f2c5a20c332?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      description: "This is a one of a kind bluetooth speaker"

    })

    const electricProd3 = await Product.create({
      category: "Electronics",
      name: "Headset",
      stock: 20,
      price: 50,
      image: "https://images.unsplash.com/photo-1565876480410-91009978e5b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80",
      description: "This is a one of a kind headset"

    })

    const userComment1 = await Comment.create({
      user:1,
      product:1,
      description: "This product is cool"

    })

    const userComment2 = await Comment.create({
      user:2,
      product:2,
      description: "This product has terrible sound quality for a bluetooth speaker"

    })

    const userComment3 = await Comment.create({
      user:3,
      product:3,
      description: "This product is too heavy on the head, and falls off"

    })

    await userComment1.setProduct(electricProd1)
    await userComment1.setUser(user1)

    await userComment2.setProduct(electricProd2)
    await userComment2.setUser(user2)

    await userComment3.setProduct(electricProd3)
    await userComment3.setUser(user3)





  }
  catch (e) {
    console.error(e)
  }
}

const seed = async () => {
  try {
    await seedDb()
  }
  catch (e) {
    console.error(e)
  }
  finally {
    process.exit()
  }
}

seed()