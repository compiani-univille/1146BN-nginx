package com.example.audit_service.config;

import com.example.audit_service.model.Entities.AuditEvent;
import com.example.audit_service.repo.InMemoryStore;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.time.Instant;

@Configuration
public class SampleDataConfig {

    @PostConstruct
    public void init() {
        var store = InMemoryStore.get();

        var e1 = new AuditEvent();
        e1.id = 1L;
        e1.service = "auth-service";
        e1.type = "LOGIN";
        e1.message = "Usuário 42 autenticado.";
        e1.timestamp = Instant.now().minusSeconds(3600);
        store.events.put(e1.id, e1);

        var e2 = new AuditEvent();
        e2.id = 2L;
        e2.service = "bets-service";
        e2.type = "BET_CREATED";
        e2.message = "Aposta 90001 criada com sucesso.";
        e2.timestamp = Instant.now();
        store.events.put(e2.id, e2);
    }
}
