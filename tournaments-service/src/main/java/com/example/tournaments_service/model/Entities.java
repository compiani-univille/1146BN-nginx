package com.example.tournaments_service.model;

import java.time.Instant;

public class Entities {

    public static class Tournament {
        public Long id;
        public String name;
        public String country;
        public String season;
        public String type; // LEAGUE, CUP, FRIENDLY
    }

    public static class TournamentMatch {
        public Long id;
        public Long tournamentId;
        public Long matchId;     // id do match no matches/bets-service
        public String round;     // ex: "Rodada 1"
        public String homeTeam;
        public String awayTeam;
        public Instant startsAt;
        public String status;    // SCHEDULED | LIVE | FINISHED
    }
}
