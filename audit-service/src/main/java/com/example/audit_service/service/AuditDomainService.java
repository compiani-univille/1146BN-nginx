package com.example.audit_service.service;

import com.example.audit_service.dto.AuditEventRequest;
import com.example.audit_service.dto.AuditEventResponse;
import com.example.audit_service.model.Entities.AuditEvent;
import com.example.audit_service.repo.InMemoryStore;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

@Service
public class AuditDomainService {

    private Long nextId() {
        return InMemoryStore.get().events.keySet().stream()
                .max(Long::compareTo)
                .orElse(0L) + 1;
    }

    public AuditEventResponse create(AuditEventRequest req) {
        var event = new AuditEvent();
        event.id = nextId();
        event.service = req.service();
        event.type = req.type();
        event.message = req.message();
        event.timestamp = req.timestamp() != null ? req.timestamp() : Instant.now();

        InMemoryStore.get().events.put(event.id, event);
        return toDto(event);
    }

    public List<AuditEventResponse> list(String service, String type) {
        return InMemoryStore.get().events.values().stream()
                .filter(e -> service == null || e.service.equalsIgnoreCase(service))
                .filter(e -> type == null || e.type.equalsIgnoreCase(type))
                .sorted(Comparator.comparing((AuditEvent e) -> e.timestamp).reversed())
                .map(this::toDto)
                .toList();
    }

    private AuditEventResponse toDto(AuditEvent e) {
        return new AuditEventResponse(
                e.id,
                e.service,
                e.type,
                e.message,
                e.timestamp
        );
    }
}
