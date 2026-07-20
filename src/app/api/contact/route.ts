import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const subjectLine = subject
      ? `[VTH Contact] ${subject} - from ${name}`
      : `[VTH Contact] Message from ${name}`;

    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      subject ? `Subject: ${subject}` : "",
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    // Send email via FormSubmit.co (free, no API key needed)
    // On first submission, FormSubmit will send a confirmation email to voltatourismh@gmail.com — click it once to activate.
    const emailSent = await sendEmail(subjectLine, emailBody, email);

    // Send WhatsApp notification via CallMeBot (free, needs one-time activation at callmebot.com)
    const waText = [
      `*VTH Contact Form*`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      subject ? `Subject: ${subject}` : "",
      ``,
      `Message:`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const waSent = await sendWhatsApp(waText);

    return NextResponse.json({
      success: true,
      email: emailSent ? "sent" : "failed",
      whatsapp: waSent ? "sent" : "failed",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}

async function sendEmail(
  subject: string,
  body: string,
  replyTo: string
): Promise<boolean> {
  try {
    const formData = new URLSearchParams();
    formData.append("name", "Volta Tourism Hub Website");
    formData.append("email", replyTo);
    formData.append("subject", subject);
    formData.append("message", body);
    formData.append("_subject", subject);
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    const res = await fetch("https://formsubmit.co/ajax/voltatourismh@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendWhatsApp(text: string): Promise<boolean> {
  try {
    // CallMeBot free WhatsApp API
    // One-time setup needed: visit https://www.callmebot.com/blog/free-api-whatsapp-messages/
    // to activate the phone number +233244183058
    const url = `https://api.callmebot.com/whatsapp.php?phone=233244183058&text=${encodeURIComponent(text)}`;

    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    return data.success === true || res.ok;
  } catch {
    return false;
  }
}