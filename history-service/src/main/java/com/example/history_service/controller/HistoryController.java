package com.example.history_service.controller;

import com.example.history_service.dto.BetHistoryResponse;
import com.example.history_service.service.HistoryDomainService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
public class HistoryController {

    private final HistoryDomainService service;

    public HistoryController(HistoryDomainService service) {
        this.service = service;
    }

    // MVP: userId fixo 42 (igual bets-service)
    private Long currentUserId() {
        return 42L;
    }

    /**
     * Exemplo:
     * GET /history?status=WON&from=2025-11-10T00:00:00Z&to=2025-11-12T23:59:59Z&match=Corinthians
     */
    @GetMapping("/bets")
    public List<BetHistoryResponse> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to,
            @RequestParam(required = false) String match
    ) {
        return service.list(currentUserId(), status, from, to, match);
    }

    @GetMapping("/bets/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        var dto = service.get(currentUserId(), id);
        return dto == null
                ? ResponseEntity.status(404).body(Map.of("error", "NOT_FOUND", "message", "Aposta não encontrada"))
                : ResponseEntity.ok(dto);
    }
}
