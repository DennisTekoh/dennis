const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@dennisconsulting.solutions";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Dennis Consulting Solutions <info@dennisconsulting.solutions>";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function clean(value) {
  return String(value || "").trim();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return json(500, { message: "Email service is not configured" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { message: "Invalid request" });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const service = clean(payload.service);
  const message = clean(payload.message);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { message: "Please complete all required fields" });
  }

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service || "Not specified"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Website inquiry from ${name}`,
      text: emailBody,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend error:", details);
    return json(502, { message: "Email could not be sent" });
  }

  return json(200, { message: "Message sent" });
};
