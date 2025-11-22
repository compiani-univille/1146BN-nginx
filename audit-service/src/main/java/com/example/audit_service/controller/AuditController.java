package com.example.audit_service.controller;

import com.example.audit_service.dto.AuditEventRequest;
import com.example.audit_service.dto.AuditEventResponse;
import com.example.audit_service.service.AuditDomainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class AuditController {

    private final AuditDomainService service;

    public AuditController(AuditDomainService service) {
        this.service = service;
    }

    @PostMapping("/events")
    public AuditEventResponse create(@RequestBody AuditEventRequest req) {
        return service.create(req);
    }

    @GetMapping("/events")
    public List<AuditEventResponse> list(
            @RequestParam(required = false) String serviceName,
            @RequestParam(required = false) String type
    ) {
        return this.service.list(serviceName, type);
    }
}
