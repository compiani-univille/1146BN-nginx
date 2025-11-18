package com.example.matches_service.dto;

import java.time.Instant;

public record MatchResponse(
    Long id,
    String homeTeam,
    String awayTeam,
    Instant startsAt,
    String status // SCHEDULED | LIVE | FINISHED
) {}
