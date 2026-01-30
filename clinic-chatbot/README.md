# Clinic WhatsApp Chatbot (FastAPI + Postgres)

Protótipo de chatbot para clínica odontológica com integração via WhatsApp (Twilio) e armazenamento no Postgres.

## Requisitos

- Python 3.11+
- Postgres (via Docker Compose ou instância externa)

## Configuração rápida

1. Copie o arquivo de variáveis:

```bash
cp .env.example .env
```

2. Suba o banco:

```bash
docker compose up -d db
```

3. Crie o ambiente e instale dependências:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

4. Rode a API:

```bash
uvicorn app.main:app --reload
```

A API estará em `http://localhost:8000`.

## Testando localmente

1. Verifique o healthcheck:

```bash
curl http://localhost:8000/health
```

2. Envie uma mensagem simulando o webhook do Twilio:

```bash
curl -X POST http://localhost:8000/webhooks/whatsapp \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "From=whatsapp:+5511999999999" \
  --data-urlencode "Body=Olá, gostaria de agendar"
```

Você deve receber um XML (TwiML) com a resposta do bot.

3. (Opcional) Exponha a API para testar com o Twilio:

- Use ngrok ou um proxy similar:

```bash
ngrok http 8000
```

- Configure o webhook do Twilio para o endpoint publicado:

```
POST https://SEU_SUBDOMINIO.ngrok-free.app/webhooks/whatsapp
```

## Integração WhatsApp (Twilio)

Configure o webhook do Twilio WhatsApp para:

```
POST https://SEU_DOMINIO/webhooks/whatsapp
```

Campos esperados (Twilio):
- `From`: número do paciente
- `Body`: mensagem do paciente

A resposta é um XML simples compatível com Twilio.

## Fluxo de conversa

- Registra paciente pela origem (`From`).
- Cria conversa ativa.
- Armazena mensagens e resposta do bot.

## Observações

- Se `OPENAI_API_KEY` estiver configurada, o bot usa uma resposta simples com contexto de clínica. Sem chave, responde com fallback.
- Este é um protótipo; inclua LGPD, auditoria e autenticação antes de produção.
