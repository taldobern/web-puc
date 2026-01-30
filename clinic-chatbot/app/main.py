import os

from dotenv import load_dotenv
from fastapi import FastAPI, Form
from fastapi.responses import PlainTextResponse
from sqlalchemy import select

from app.db import SessionLocal, engine
from app.models import Base, Conversation, Message, Patient
from app.services.ai import generate_reply
from app.services.whatsapp import build_twilio_response

load_dotenv()

app = FastAPI(title="Clinic WhatsApp Chatbot")


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def healthcheck() -> dict:
    return {"status": "ok"}


@app.post("/webhooks/whatsapp", response_class=PlainTextResponse)
def whatsapp_webhook(
    From: str = Form(...),
    Body: str = Form(...),
) -> str:
    clinic_name = os.getenv("DEFAULT_CLINIC_NAME", "Clínica Sorriso")

    with SessionLocal() as session:
        patient = session.scalar(select(Patient).where(Patient.phone_number == From))
        if not patient:
            patient = Patient(phone_number=From)
            session.add(patient)
            session.flush()

        conversation = (
            session.query(Conversation)
            .filter(Conversation.patient_id == patient.id, Conversation.status == "open")
            .order_by(Conversation.created_at.desc())
            .first()
        )
        if not conversation:
            conversation = Conversation(patient_id=patient.id)
            session.add(conversation)
            session.flush()

        inbound_message = Message(
            conversation_id=conversation.id,
            sender="patient",
            content=Body,
        )
        session.add(inbound_message)

        reply_text = generate_reply(Body, clinic_name)
        outbound_message = Message(
            conversation_id=conversation.id,
            sender="bot",
            content=reply_text,
        )
        session.add(outbound_message)

        session.commit()

    return build_twilio_response(reply_text)
