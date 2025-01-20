import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, username, email_addresses, image_url, first_name, last_name } =
      evt.data;
    const createdUser = await fetchMutation(api.users.createUser, {
      clerkId: id,
      username: username!,
      email: email_addresses[0].email_address,
      image: image_url,
      name:
        `${first_name} ${last_name}` ||
        email_addresses[0].email_address.split("@")[0],
    });

    if (createdUser) {
      return NextResponse.json(
        { success: true, data: createdUser },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          data: "Error creating user",
        },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name } = evt.data;
    const userId = await fetchQuery(api.users.getUserByClerkId, {
      clerkId: id,
    });

    if (userId) {
      throw new Error("User by ClerkId not found");
    }
    const updatedUser = await fetchMutation(api.users.updateUser, {
      id: userId!,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });

    if (updatedUser) {
      return NextResponse.json(
        { success: true, data: updatedUser },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          data: "Error updating user",
        },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const userId = await fetchQuery(api.users.getUserByClerkId, {
      clerkId: id!,
    });

    if (userId) {
      throw new Error("User by ClerkId not found");
    }

    await fetchMutation(api.users.deleteUser, { id: userId! });

    return NextResponse.json({ success: true, data: null }, { status: 200 });
  }

  return NextResponse.json({ success: true, data: null }, { status: 200 });
}
