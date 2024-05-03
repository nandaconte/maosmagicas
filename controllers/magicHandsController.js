//FAZER REQUIRE DO MODELS
const client = require('../models/client')
const agenda = require('../models/agenda')

const { Op } = require('sequelize')
const nodemailer = require('nodemailer')

module.exports = class magicHandsController {
    static showHome(req, res) {
        res.render('home')
    }
    
    static showServices(req, res) {
        res.render('services')
    }

    static showClient(req, res) {
        res.render('client')
    }

    static insertClient(req, res) {
        const cliente = {
            name: req.body.name,
            idade: req.body.idade,
            cpf: req.body.cpf,
            contato: req.body.contato,
            end: req.body.end,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            queixa:req.body.queixa           
        }

        client.create(cliente)
        .then(res.redirect('/agendar'))
        .catch((err) => console.log())


     } 
     
    static showAgendar(req, res) {
        res.render('agendar')
    }

    static insertAgenda(req, res) {
        const agendar ={
            cpf : req.body.cpf,
            procedimento: req.body.procedimento,
            profissional: req.body.profissional,
            dia:req.body.dia,
            horario:req.body.horario
        }

        agenda.create(agendar)
        .then(res.redirect('/'))
        .catch((err) => console.log())
       
   } 
   
   

    static showConsultar(req, res) {
        res.render('consult')
    }

    static showContato(req, res) {
        res.render('contact')
    }

    static sendMessage(req, res) {
        const name = req.body.name
        const email = req.body.email
        const assunto = req.body.subject
        const mensagem = req.body.message
        const user = "magichands611@gmail.com"
        const pass = "BD78F888E8F6EE23D6552D6322F7C31B12BB"
        //magichands123 (SENHA EMAIL)

        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            auth: {user, pass}
        })
        transporter.sendMail({
            from: user,
            to: user,
            replyTo: email,
            subject: assunto,
            text: mensagem
        }).then(info =>{
            res.redirect('/')
        }).catch(error => {
            res.send(error)
        })
    }

    static showHomeStaff(req, res){
        res.render('staffHome')
    }
    static updatadeAgenda(req,res){
        const cpf = req.params.cpf
        agenda.findOne({where: {cpf: cpf}, raw:true})
        .then(agenda => {
            res.render('/agenda/editar', {agenda})
        })
        .catch((err)=> console.log())
    }

    static removeAgenda(req, res){
        const cpf = req.body.cpf
        agenda.destroy({where: {cpf:cpf}})
        .then (()=>{
            req.flash('message', 'Agendamento removido com sucesso!')
            req.session.save(()=>{
                res.redirect('staffHome')
            })
        })
        .catch((err) => console.log())
    }
    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Agenda,
            plain: true,
        })

        const agenda = user.agenda.map((result) => result.dataValues)

        let emptyAgenda = true

        if (agenda.length > 0) {
            emptyAgenda = false
        }

        console.log(agenda)
        console.log(emptyAgenda)

        res.render('staffHome', { agenda, emptyAgenda })
    }

}


