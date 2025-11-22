package com.example.tournaments_service.dto;

import java.time.Instant;

public record TournamentMatchResponse(
        Long id,
        Long tournamentId,
        Long matchId,
        String round,          // "Rodada 1", "Quartas", etc.
        String homeTeam,
        String awayTeam,
        Instant startsAt,
        String status          // SCHEDULED | LIVE | FINISHED
) {}
