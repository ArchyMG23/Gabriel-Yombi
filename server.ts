import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";
import fs from "fs";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");
const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json");

// Helper to get subscribers
function getSubscribers(): string[] {
  if (!fs.existsSync(SUBSCRIBERS_FILE)) return [];
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Helper to save subscribers
function saveSubscribers(subscribers: string[]) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

// Helper to get appointments
function getAppointments(): any[] {
  if (!fs.existsSync(APPOINTMENTS_FILE)) return [];
  try {
    const data = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Helper to save appointments
function saveAppointments(appointments: any[]) {
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/appointments", (req, res) => {
    res.json(getAppointments());
  });

  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requis" });
    
    const subscribers = getSubscribers();
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      saveSubscribers(subscribers);
    }
    
    res.status(200).json({ message: "Inscription réussie" });
  });

  app.post("/api/notify-subscribers", async (req, res) => {
    const { postTitle, postContent, postUrl } = req.body;
    const subscribers = getSubscribers();
    
    if (subscribers.length === 0) {
      return res.status(200).json({ message: "Aucun abonné à notifier" });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.warn("Credentials missing for newsletter notification");
      return res.status(200).json({ message: "Notification simulée (identifiants manquants)" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: emailUser,
        to: subscribers.join(","),
        subject: `Nouvel article : ${postTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #D4AF37;">Nouvel article sur le blog Panda_Graphic !</h2>
            <h3 style="color: #333;">${postTitle}</h3>
            <p style="color: #666; line-height: 1.6;">${postContent.substring(0, 200)}...</p>
            <div style="margin-top: 30px;">
              <a href="${postUrl}" style="background-color: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px;">Lire l'article complet</a>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #999; font-size: 10px;">Vous recevez cet e-mail car vous êtes abonné à la newsletter Panda_Graphic.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Abonnés notifiés avec succès" });
    } catch (error) {
      console.error("Error notifying subscribers:", error);
      res.status(500).json({ error: "Erreur lors de la notification" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    const appointment = req.body;
    
    // Save appointment
    const appointments = getAppointments();
    appointments.push(appointment);
    saveAppointments(appointments);
    
    // Check if email credentials are provided
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || "gabrielyombi311@gmail.com";

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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
