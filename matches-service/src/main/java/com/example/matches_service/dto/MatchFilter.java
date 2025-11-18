package com.example.matches_service.dto;

import java.time.Instant;

/**
 * Filtros opcionais para a listagem de jogos.
 * Todos os campos são opcionais.
 */
public record MatchFilter(
    String team,          // nome contém (home ou away)
    String status,        // SCHEDULED | LIVE | FINISHED
    Instant dateFrom,     // >= startsAt
    Instant dateTo        // <= startsAt
) {}
