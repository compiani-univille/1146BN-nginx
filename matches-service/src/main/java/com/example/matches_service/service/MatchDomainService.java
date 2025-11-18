package com.example.matches_service.service;

import com.example.matches_service.dto.MatchFilter;
import com.example.matches_service.dto.MatchResponse;
import com.example.matches_service.model.Entities.Match;
import com.example.matches_service.repo.InMemoryStore;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
public class MatchDomainService {

    public List<MatchResponse> list(MatchFilter filter) {
        return InMemoryStore.get().matches.values().stream()
            .filter(m -> filterTeam(m, filter.team()))
            .filter(m -> filterStatus(m, filter.status()))
            .filter(m -> filterFrom(m, filter.dateFrom()))
            .filter(m -> filterTo(m, filter.dateTo()))
            .sorted(Comparator.comparing((Match mm) -> mm.startsAt))
            .map(this::toDto)
            .toList();
    }

    public MatchResponse get(Long id) {
        var m = InMemoryStore.get().matches.get(id);
        return m == null ? null : toDto(m);
    }

    private boolean filterTeam(Match m, String team) {
        if (team == null || team.isBlank()) return true;
        var t = team.toLowerCase(Locale.ROOT);
        return (m.homeTeam != null && m.homeTeam.toLowerCase(Locale.ROOT).contains(t))
            || (m.awayTeam != null && m.awayTeam.toLowerCase(Locale.ROOT).contains(t));
    }

    private boolean filterStatus(Match m, String status) {
        if (status == null || status.isBlank()) return true;
        return Objects.equals(m.status, status);
    }

    private boolean filterFrom(Match m, Instant from) {
        return from == null || (m.startsAt != null && !m.startsAt.isBefore(from));
    }

    private boolean filterTo(Match m, Instant to) {
        return to == null || (m.startsAt != null && !m.startsAt.isAfter(to));
    }

    private MatchResponse toDto(Match m) {
        return new MatchResponse(m.id, m.homeTeam, m.awayTeam, m.startsAt, m.status);
    }
}
