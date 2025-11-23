# Configuração do Backend - BoraBet

Este guia explica como conectar o frontend aos microserviços do backend.

## Configuração das URLs dos Microserviços

1. Crie um arquivo `.env` na raiz do projeto (copie do `.env.example`):

```bash
cp .env.example .env
```

2. Configure as URLs dos seus microserviços no arquivo `.env`:

```env
# URLs dos microserviços
VITE_AUTH_URL=http://localhost:8081
VITE_BETS_URL=http://localhost:8082
VITE_MATCHES_URL=http://localhost:8083
VITE_HISTORY_URL=http://localhost:8084
```

**Importante:** Ajuste as portas conforme a configuração do seu backend.

## Estrutura dos Microserviços

### Auth Service (porta 8081)
- `POST /login` - Login do usuário
  ```json
  Body: { "email": "user@example.com", "password": "senha123" }
  Response: { "accessToken": "...", "refreshToken": "...", "expiresIn": 900 }
  ```

- `POST /users` - Registro de novo usuário
  ```json
  Body: { "email": "user@example.com", "password": "senha123", "name": "Nome" }
  ```

### Bets Service (porta 8082)
- `GET /matches` - Lista partidas disponíveis
- `GET /markets?matchId={id}` - Lista mercados de uma partida
- `POST /bets` - Criar nova aposta
  ```json
  Body: {
    "matchId": 101,
    "marketId": 5001,
    "selectionCode": "HOME",
    "odds": 1.95,
    "stake": 50.0
  }
  ```
- `GET /bets` - Lista apostas do usuário
- `GET /bets/{id}` - Busca aposta específica
- `POST /bets/{id}/cashout` - Realizar cashout

### History Service (porta 8084)
- `GET /history` - Histórico de apostas/partidas

## Iniciar o Projeto

1. Certifique-se de que todos os microserviços estão rodando
2. Configure o arquivo `.env` com as URLs corretas
3. Inicie o frontend:

```bash
npm run dev
```

## CORS

Certifique-se de que seus microserviços backend estão configurados para aceitar requisições do frontend. Você pode precisar adicionar configurações CORS nos seus serviços.

Exemplo de configuração CORS para Spring Boot:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
            }
        };
    }
}
```

## Fluxo de Autenticação

1. Usuário faz login/registro pela página `/auth`
2. O `accessToken` é armazenado no localStorage como `borabet_token`
3. As requisições aos serviços usam este token (implementar quando necessário)
4. O usuário é redirecionado para o dashboard `/dashboard`

## Estrutura de Dados

### Match (Partida)
```typescript
{
  id: number;
  homeTeam: string;
  awayTeam: string;
  startsAt: string; // ISO 8601
  status: string; // "SCHEDULED", "LIVE", "FINISHED"
}
```

### Market (Mercado)
```typescript
{
  id: number;
  matchId: number;
  type: string;
  selections: Array<{
    code: string; // "HOME", "DRAW", "AWAY"
    odds: number;
  }>;
}
```

### Bet (Aposta)
```typescript
{
  id: number;
  userId: number;
  matchId: number;
  marketId: number;
  selectionCode: string;
  odds: number;
  stake: number;
  potentialReturn: number;
  status: string; // "OPEN", "WON", "LOST", "VOID", "CASHED_OUT"
  result: string | null;
  createdAt: string; // ISO 8601
  settledAt: string | null;
}
```

## Problemas Comuns

### Erro de CORS
- Verifique se o backend está configurado para aceitar requisições do frontend
- Adicione `http://localhost:5173` nas origens permitidas

### Erro de Conexão
- Verifique se os microserviços estão rodando nas portas corretas
- Confirme as URLs no arquivo `.env`

### Erro ao criar aposta
- Verifique se o `marketId` e `selectionCode` correspondem aos dados do backend
- Confirme que o usuário tem saldo suficiente
