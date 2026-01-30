import os

import httpx

DEFAULT_MESSAGE = (
    "Obrigado por entrar em contato com a {clinic}. "
    "Posso ajudar com agendamentos, horários e orientações básicas. "
    "Qual é a sua necessidade hoje?"
)


def _build_prompt(user_message: str, clinic_name: str) -> str:
    return (
        "Você é um assistente de clínica odontológica. "
        "Responda de forma breve, educada e com foco em triagem. "
        f"Nome da clínica: {clinic_name}. "
        f"Mensagem do paciente: {user_message}"
    )


def generate_reply(user_message: str, clinic_name: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return DEFAULT_MESSAGE.format(clinic=clinic_name)

    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    prompt = _build_prompt(user_message, clinic_name)

    try:
        response = httpx.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": model,
                "messages": [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": user_message},
                ],
                "temperature": 0.4,
            },
            timeout=15,
        )
        response.raise_for_status()
        payload = response.json()
        return payload["choices"][0]["message"]["content"].strip()
    except (httpx.HTTPError, KeyError, IndexError):
        return DEFAULT_MESSAGE.format(clinic=clinic_name)
