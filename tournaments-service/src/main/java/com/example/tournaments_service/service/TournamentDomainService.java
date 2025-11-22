package com.example.tournaments_service.service;

import com.example.tournaments_service.dto.TournamentMatchResponse;
import com.example.tournaments_service.dto.TournamentResponse;
import com.example.tournaments_service.model.Entities.Tournament;
import com.example.tournaments_service.model.Entities.TournamentMatch;
import com.example.tournaments_service.repo.InMemoryStore;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TournamentDomainService {

    public List<TournamentResponse> listTournaments() {
        return InMemoryStore.get().tournaments.values().stream()
                .sorted(Comparator.comparing(t -> t.name))
                .map(this::toDto)
                .toList();
    }

    public TournamentResponse getTournament(Long id) {
        var t = InMemoryStore.get().tournaments.get(id);
        return t == null ? null : toDto(t);
    }

    public List<TournamentMatchResponse> listMatches(Long tournamentId) {
        return InMemoryStore.get().matches.values().stream()
                .filter(m -> tournamentId.equals(m.tournamentId))
                .sorted(Comparator.comparing((TournamentMatch m) -> m.startsAt))
                .map(this::toMatchDto)
                .toList();
    }

    private TournamentResponse toDto(Tournament t) {
        return new TournamentResponse(
                t.id,
                t.name,
                t.country,
                t.season,
                t.type
        );
    }

    private TournamentMatchResponse toMatchDto(TournamentMatch m) {
        return new TournamentMatchResponse(
                m.id,
                m.tournamentId,
                m.matchId,
                m.round,
                m.homeTeam,
                m.awayTeam,
                m.startsAt,
                m.status
        );
    }
}
