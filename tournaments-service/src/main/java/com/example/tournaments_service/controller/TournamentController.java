package com.example.tournaments_service.controller;

import com.example.tournaments_service.dto.TournamentMatchResponse;
import com.example.tournaments_service.dto.TournamentResponse;
import com.example.tournaments_service.service.TournamentDomainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
public class TournamentController {

    private final TournamentDomainService service;

    public TournamentController(TournamentDomainService service) {
        this.service = service;
    }

    @GetMapping("/tournaments")
    public List<TournamentResponse> list() {
        return service.listTournaments();
    }

    @GetMapping("/tournaments/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        var dto = service.getTournament(id);
        return dto == null
                ? ResponseEntity.status(404).body(Map.of("error", "NOT_FOUND", "message", "Torneio não encontrado"))
                : ResponseEntity.ok(dto);
    }

    @GetMapping("/tournaments/{id}/matches")
    public List<TournamentMatchResponse> listMatches(@PathVariable Long id) {
        return service.listMatches(id);
    }
}
