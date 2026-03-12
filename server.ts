import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.post("/api/appointments", async (req, res) => {
    const appointment = req.body;
    
    // Check if email credentials are provided
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || "yombivictor@gmail.com";

    if (!emailUser || !emailPass) {
      console.warn("Email credentials missing. Logging appointment instead.");
      console.log("New Appointment:", appointment);
      return res.status(200).json({ 
        message: "Appointment received, but email not sent due to missing credentials.",
        appointment 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // Or another service
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: emailUser,
        to: [emailTo, appointment.email],
        subject: `Nouveau rendez-vous : ${appointment.name}`,
        text: `
          Nouveau rendez-vous confirmé !
          
          Client : ${appointment.name}
          Email : ${appointment.email}
          Date : ${appointment.date}
          Heure : ${appointment.time}
          Description : ${appointment.description}
          Services : ${appointment.services.join(", ")}
          
          Merci de votre confiance.
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #D4AF37;">Nouveau rendez-vous confirmé !</h2>
            <p><strong>Client :</strong> ${appointment.name}</p>
            <p><strong>Email :</strong> ${appointment.email}</p>
            <p><strong>Date :</strong> ${appointment.date}</p>
            <p><strong>Heure :</strong> ${appointment.time}</p>
            <p><strong>Description :</strong> ${appointment.description}</p>
            <p><strong>Services :</strong> ${appointment.services.join(", ")}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">Ceci est un message automatique de PANDA_GRAPHIC.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ message: "Appointment received and email sent.", appointment });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email notification." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
