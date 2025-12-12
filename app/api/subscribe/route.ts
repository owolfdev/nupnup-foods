import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function saveEmailToSupabase(email: string, product: string) {
  // Check if email already exists
  const { data: existing } = await supabase
    .from("subscribers")
    .select("email")
    .eq("email", email)
    .single();

  if (existing) {
    return { success: true, message: "You're already subscribed!", isNew: false };
  }

  // Insert new subscriber
  const { data, error } = await supabase
    .from("subscribers")
    .insert([
      {
        email,
        product,
        subscribed_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return { success: true, message: "Thank you for subscribing!", isNew: true, data };
}

async function sendWelcomeEmail(email: string, product: string) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.warn("Resend API key or EMAIL_FROM not configured, skipping email");
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Nup Nup Foods",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1b4d3e;">Thank you for your interest!</h1>
          <p>We're excited to share updates about <strong>${product}</strong> with you.</p>
          <p>You'll be among the first to know when it's available for purchase.</p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Best regards,<br>
            The Nup Nup Foods Team
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw - email sending failure shouldn't break subscription
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, product } = body;

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save to Supabase
    const result = await saveEmailToSupabase(
      email.toLowerCase().trim(),
      product || "Thai Nectar Coconut Syrup"
    );

    // Send welcome email if it's a new subscriber
    if (result.isNew) {
      await sendWelcomeEmail(email, product || "Thai Nectar Coconut Syrup");
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
    });
  } catch (error: any) {
    console.error("Error processing subscription:", error);
    
    // Handle Supabase unique constraint errors
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
