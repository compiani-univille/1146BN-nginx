package com.example.tournaments_service.dto;

public record TournamentResponse(
        Long id,
        String name,
        String country,
        String season,
        String type // LEAGUE, CUP, FRIENDLY...
) {}
