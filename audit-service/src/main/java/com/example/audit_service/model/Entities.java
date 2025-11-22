package com.example.audit_service.model;

import java.time.Instant;

public class Entities {

    public static class AuditEvent {
        public Long id;
        public String service;
        public String type;
        public String message;
        public Instant timestamp;
    }
}
