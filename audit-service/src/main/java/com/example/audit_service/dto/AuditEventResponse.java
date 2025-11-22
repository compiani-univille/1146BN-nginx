package com.example.audit_service.dto;

import java.time.Instant;

public record AuditEventResponse(
        Long id,
        String service,
        String type,
        String message,
        Instant timestamp
) {}
