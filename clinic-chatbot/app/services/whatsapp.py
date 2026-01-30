from xml.sax.saxutils import escape


def build_twilio_response(message: str) -> str:
    safe_message = escape(message)
    return f"""<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<Response>
    <Message>{safe_message}</Message>
</Response>"""
