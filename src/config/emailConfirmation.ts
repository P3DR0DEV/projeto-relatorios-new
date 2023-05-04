import { config } from "dotenv"
import nodemailer, { SendMailOptions } from "nodemailer"
config()

const user = process.env.NOREPLY_USER_EMAIL
const pass = process.env.NOREPLY_USER_PASS

export function sendConfirmationEmail(aluno: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  })
  const mailOptions: SendMailOptions = {
    from: user,
    to: "pedromendes@claretiano.edu.br, pablo.santos@claretiano.edu.br",
    subject: "Relatorios",
    html: `<b>O relatório do aluno <strong>${aluno}</strong> foi gerado com sucesso!<br/>Para baixa-lo, basta acessar <a href="https://bho.relatorios.claretiano.edu.br">Relatórios</a>.</b>`,
  }

  transporter.sendMail(mailOptions, (error) => {
    if (error) return error
  })
}
