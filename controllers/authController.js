const User = require('../models/user')

const bcrypt = require('bcryptjs')

module.exports = class StaffController {
  static login(req, res) {
    res.render('login')
  }
  
  static async loginPost(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      res.render('login', {
        message: 'Usuário não encontrado!',
      })
      return
    }
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      res.render('login', {
        message: 'Senha inválida!',
      })
      return
    }
    req.session.userid = user.id
    req.flash('message', 'Login realizado com sucesso!')
    req.session.save(() => {
      res.redirect('/homestaff')
    })
  }
  static register(req, res) {
    res.render('register')
  }
  
  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('register')
      return
    }
    const checkIfUserExists = await User.findOne({ where: { email: email } })
    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso!')
      res.render('register')
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = {
      name,
      email,
      password: hashedPassword,
    }
    User.create(user)
      .then((user) => {
        req.session.userid = user.id
        req.session.userid = user.id
        req.flash('message', 'Cadastro realizado com sucesso!')
        req.session.save(() => {
          res.redirect('/login')
        })
      })
      .catch((err) => console.log(err))
  }  

//   static logout(req, res) {
//     req.session.destroy()
//     res.redirect('/login')
//   }
}