from pydantic import BaseModel


class WhatsAppInbound(BaseModel):
    from_number: str
    body: str
