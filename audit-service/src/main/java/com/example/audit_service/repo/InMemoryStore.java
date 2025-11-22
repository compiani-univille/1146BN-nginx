package com.example.audit_service.repo;

import com.example.audit_service.model.Entities.AuditEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryStore {

    public final Map<Long, AuditEvent> events = new ConcurrentHashMap<>();

    private static final InMemoryStore INSTANCE = new InMemoryStore();
    public static InMemoryStore get() { return INSTANCE; }

    private InMemoryStore() {}
}
