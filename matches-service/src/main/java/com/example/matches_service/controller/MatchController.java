package com.example.matches_service.controller;

import com.example.matches_service.dto.MatchFilter;
import com.example.matches_service.dto.MatchResponse;
import com.example.matches_service.service.MatchDomainService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/matches")
public class MatchController {

    private final MatchDomainService service;

    public MatchController(MatchDomainService service) {
        this.service = service;
    }

    /**
     * Listagem com filtros opcionais:
     * ?team=palmeiras&status=SCHEDULED&dateFrom=2025-11-10T00:00:00Z&dateTo=2025-11-13T23:59:59Z
     */
    @GetMapping
    public List<MatchResponse> list(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String status,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant dateFrom,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant dateTo
    ) {
        var filter = new MatchFilter(team, status, dateFrom, dateTo);
        return service.list(filter);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        var dto = service.get(id);
        return dto == null
                ? ResponseEntity.status(404).body(Map.of("error","NOT_FOUND","message","Match não encontrado"))
                : ResponseEntity.ok(dto);
    }
}
