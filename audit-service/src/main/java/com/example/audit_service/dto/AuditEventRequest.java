package com.example.audit_service.dto;

import java.time.Instant;

public record AuditEventRequest(
        String service,     // bets-service, auth-service, matches-service...
        String type,        // LOGIN, BET_CREATED, CASHOUT, ERROR, etc.
        String message,     // descrição
        Instant timestamp   // opcional (se null -> now)
) {}
